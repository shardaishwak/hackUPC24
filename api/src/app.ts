import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import helmet from "helmet";
import BodyParser from "body-parser";
import ErrorWithStatus from "./ErrorWithStatus";

// load env

dotenv.config();

const app = express();

app.use(helmet());
app.use(BodyParser.json());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

app.post("/ask", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { prompt, engine = "2D" } = req.body;
		if (!prompt) {
			throw new ErrorWithStatus("Prompt is required", 400);
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
            only html code
            If the user asks something inappropriate or out of context, do not return anything.
            do not write anything. Just give code. No JSON, just HTML code.

            your code needs to be complete. Try to give it as many features as possible.
        `;

		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{ role: "system", content: setup_prompt },
				{ role: "user", content: prompt },
			],
			model: "gpt-4-turbo",
		});

		if (
			!chatCompletion.choices ||
			chatCompletion.choices.length === 0 ||
			!chatCompletion.choices[0].message.content
		) {
			throw new ErrorWithStatus("No response from the model", 500);
		}

		const result = chatCompletion.choices[0].message.content.replace("```", "");
		res.send(result);
	} catch (err) {
		next(err);
	}
});

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
