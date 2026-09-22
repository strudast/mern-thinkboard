import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
	// underscore for parameter that we wont use/need . it was "req"
	try {
		const notes = await Note.find().sort({ createdAt: -1 }); // .find is a mongoose method for query in collection . the collection here is reffered from the model name Note // -1 will sort in desc. order (newest first)
		res.status(200).json(notes);
	} catch (error) {
		console.error("Error in getAllNotes controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function getNoteById(req, res) {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) return res.status(404).json({ message: "Note not Found!" }); // .find is a mongoose method for query in collection . the collection here is reffered from the model name Note
		res.status(200).json(note);
	} catch (error) {
		console.error("Error in getNoteById controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function createNote(req, res) {
	try {
		const { title, content } = req.body;
		//to access the title, content we added app.use(express.json) on server.js
		const newNote = new Note({ title, content });

		await newNote.save();
		res.status(201).json({ message: "Note created" });
	} catch (error) {
		console.error("Error in createNote controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateNote(req, res) {
	try {
		const { title, content } = req.body;
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id,
			{
				title,
				content,
			},
			{ new: true },
		);
		if (!updatedNote)
			return res.status(404).json({ message: "Note not Found!" });
		res.status(200).json(updatedNote);
	} catch (error) {
		console.error("Error in updateNote controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function deleteNote(req, res) {
	try {
		const { title, content } = req.body;
		const deletedNote = await Note.findByIdAndDelete(req.params.id, {
			title,
			content,
		});
		if (!deletedNote)
			return res.status(404).json({ message: "Note not Found!" });
		res.status(200).json({ message: "Note deleted successfully" });
	} catch (error) {
		console.error("Error in deleteNote controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
