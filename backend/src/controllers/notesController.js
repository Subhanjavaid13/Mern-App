import mongoose from "mongoose";
import Note from "../models/Note.js"

export async  function getAllNotes(_,res){
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error In Gettings All Notes",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getNoteById(req,res){
    try {
        if(!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({message:"Note not found"})

        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note);
    } catch (error) {
        console.log("Error In Getting Note",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function createNote(req,res){
    try {
        const {title,content} = req.body;
        const note  = new Note({ title,content });

        const newNote = await note.save();
        res.status(201).json(newNote)

    } catch (error) {
        console.log("Error In Creating Note",error);
        res.status(500).json({message:"Internal Server Error"})
}
}

export async function updateNote(req,res){
    try {
        const {title,content} = req.body;

        const updateNote = await Note.findByIdAndUpdate(req.params.id,
            {title,content},
            { new:true}
        );
        if(!updateNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updateNote);
    } catch (error) {
        console.log("Error In Updating Note",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteNote(req,res){
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note Deleted Successfully"});
    } catch (error) {
        console.log("Error In Deleting Note",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
