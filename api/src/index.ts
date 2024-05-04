import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5001;

mongoose
	.connect(process.env.DATABASE_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log("Database connected");
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error: Error) => {
		console.log(error.message);
	});
