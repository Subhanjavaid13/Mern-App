import Note from "../models/Note.js"

export async  function getAllNotes(req,res){
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error In Gettings All Notes",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function createNote(req,res){
    try {
        const {title,content} = req.body;
        const newNote  = new Note({ title,content });
        
        await newNote.save();
        res.status(201).json({message:"Note is Created successfully"})
        
    } catch (error) {
        console.log("Error In Creating Note",error);
        res.status(500).json({message:"Internal Server Error"})
}
}

export async function updateNote(req,res){
    res.status(200).json({message:"Note is updates successfully"})
}

export async function deleteNote(req,res){
    res.status(200).json({message:"Note is deleted successfully"})
}