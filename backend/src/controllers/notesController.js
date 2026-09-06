import mongoose from "mongoose";
import Note from "../models/Note.js"

/** Mongoose validation failures are the client's fault (400), not the server's (500). */
function handleError(res, error, context) {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: "Title and content are required." });
    }
    console.error(context, error);
    return res.status(500).json({ message: "Internal Server Error" });
}

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        handleError(res, error, "Error In Getting All Notes");
    }
}

export async function getNoteById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Note not found" })

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(note);
    } catch (error) {
        handleError(res, error, "Error In Getting Note");
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });

        const newNote = await note.save();
        res.status(201).json(newNote)
    } catch (error) {
        handleError(res, error, "Error In Creating Note");
    }
}

export async function updateNote(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Note not found" })

        const { title, content } = req.body;

        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );
        if (!updateNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json(updateNote);
    } catch (error) {
        handleError(res, error, "Error In Updating Note");
    }
}

export async function deleteNote(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Note not found" })

        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json({ message: "Note Deleted Successfully" });
    } catch (error) {
        handleError(res, error, "Error In Deleting Note");
    }
}
