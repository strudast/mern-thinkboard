import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

//middleware
app.use(
	cors({
		origin: "http://localhost:5173",
	}),
);

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next) => {
// 	console.log(`Req Method is ${req.method} & ReqURL is ${req.url}`);
// 	next(); //this is what to do next, after the middleware func. in the case of calling the get all notes, the next is the getAllNotes controller
// });

app.use("/api/notes", notesRoutes);
//changed the order of calling the funcs. so, first we connect to DB and then we start the listening-start the server. be fore, was the opposite which is not a good practice.
//before: connectDB();
// app.listen(PORT, () => {
// console.log("server started on port:", PORT);
// });
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("server started on port:", PORT);
	});
});
