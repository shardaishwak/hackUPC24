import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import helmet from "helmet";
import cors from "cors";
import BodyParser from "body-parser";
import ErrorWithStatus from "./ErrorWithStatus";
import { Document, Document as IDocument, User, Version } from "./models";

// load env

dotenv.config();

const app = express();

app.use(helmet());
app.use(BodyParser.json());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
);

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

app.post("/user", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { uid } = req.body;
		const user = await User.create({
			uid,
		});
		res.send(user);
	} catch (err) {
		next(err);
	}
});

app.post("/ask", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { prompt, engine = "2D", uid, documentID } = req.body;
		if (!prompt) {
			throw new ErrorWithStatus("Prompt is required", 400);
		}

		if (!uid) {
			throw new ErrorWithStatus("uid is required", 400);
		}

		const user = await User.findOne({ uid });
		if (!user) {
			throw new ErrorWithStatus("User not found", 404);
		}

		let document: IDocument;
		if (documentID) {
			document = (await Document.findById(documentID).populate(
				"versions"
			)) as IDocument;
			// create a new document if the document is not found
			if (!document) {
				document = await Document.create({
					title: prompt,
				});
				user.documents.push(document.id);
				await user.save();
			}
		} else {
			document = await Document.create({
				title: prompt,
			});
			user.documents.push(document.id);
			await user.save();
		}

		const engine_prompt = `
            You will be using ${
							engine === "2D" ? "p5.js" : "Three.js"
						} to create a ${engine} representation of the prompt.


            You are just allowed to use the following libraries:
            ${engine === "2D" ? "p5.js" : "Three.js"}

                        you may use any other library that is included in the above libraries.
            `;

		const setup_prompt = `
            You are a software engineer that takes a prompt and generates entire HTML file with css and JS code to be directly rendered on a page.
            ${engine_prompt}
            The user many ask you to create models, animations, or simulations, or even games. You need to make sure that the code is complete and functional.
            You need to follow the best practices and make sure that the code is clean and well-organized.
            You only return the code that is executable in the browser in one single file.
            Your output should be in the following JSON format:
            only html code with embedded css and js
            If the user asks something inappropriate, return format ERROR_444-{message}
            do not write anything. Just give code. No JSON, just HTML code.

            your code needs to be complete. Try to give it as many features as possible.

			The user can make the application as complex as they want.
			
        `;

		const messages = [{ role: "system", content: setup_prompt }];
		// load previous version history and genreate a new version
		// document.versions.forEach((version) => {
		// 	messages.push({ role: "user", content: version.prompt });
		// 	messages.push({ role: "assistant", content: version.content });
		// });

		//load the last version
		if (document.versions.length > 0) {
			const lastVersion = document.versions[document.versions.length - 1];
			messages.push({ role: "user", content: lastVersion.prompt });
			messages.push({ role: "assistant", content: lastVersion.content });
		}

		messages.push({ role: "user", content: prompt });

		const chatCompletion = await openai.chat.completions.create({
			messages: messages as any,
			// model: "gpt-4-turbo",
			model: "gpt-3.5-turbo",
		});

		if (
			!chatCompletion.choices ||
			chatCompletion.choices.length === 0 ||
			!chatCompletion.choices[0].message.content
		) {
			throw new ErrorWithStatus("No response from the model", 500);
		}

		const result = chatCompletion.choices[0].message.content.replace("```", "");

		if (result.includes("ERROR_444")) {
			throw new ErrorWithStatus(result.split("ERROR_444-")?.[1], 400);
		}

		// create a new document version
		const version = await Version.create({
			level: document.versions_count + 1,
			title: prompt,
			content: result,
			prompt: prompt,
			created_at: new Date(),
		});
		document.versions.push(version.id);
		document.versions_count += 1;
		document.updated_at = new Date();
		await document.save();

		res.send({
			document,
			version,
		});
	} catch (err) {
		next(err);
	}
});

app.get(
	"/user/:uid",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { uid } = req.params;
			// lol poor server
			const user = await User.findOne({ uid })
				.populate("documents")
				.populate({
					path: "documents",
					populate: {
						path: "versions",
					},
				});
			// user?.documents.forEach(doc  => {
			// 	doc.versions = doc.versions.map(async version => await Version.findById(version))
			// })
			if (!user) {
				// create a new user if not existing yet
				const user = await User.create({
					uid,
				});
				res.send(user);
				return;
			}
			res.send(user);
		} catch (err) {
			next(err);
		}
	}
);

app.get(
	"/document/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const document = await Document.findById(id).populate("versions");
			if (!document) {
				throw new ErrorWithStatus("Document not found", 404);
			}
			res.send(document);
		} catch (err) {
			next(err);
		}
	}
);

app.delete(
	"/document/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const document = await Document.findByIdAndDelete(id);
			if (!document) {
				throw new ErrorWithStatus("Document not found", 404);
			}
			res.send(document);
		} catch (err) {
			next(err);
		}
	}
);

// render a version
app.get(
	"/version/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const version = await Version.findById(id);
			if (!version) {
				throw new ErrorWithStatus("Version not found", 404);
			}
			//html conten
			res.send(version.content);
		} catch (err) {
			next(err);
		}
	}
);

/**
 * Any error that occurs in the application will be caught here
 */
app.use(
	(err: ErrorWithStatus, req: Request, res: Response, _: NextFunction) => {
		if (res.headersSent) return;

		const status = err.status || 500;
		const message = err.message || "Something went wrong";

		console.log("[ERROR] " + status + " ::: " + message);
		console.log(err.stack);
		res.status(status).send({ error: message, status, route: req.originalUrl });
	}
);

export default app;
