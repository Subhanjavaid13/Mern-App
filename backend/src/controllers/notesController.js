
export function getAllNotes(req,res){
    res.status(200).send("5 Notes")
}

export function createNote(req,res){
    res.status(201).json({message:"Note is created successfully"})
}

export function updateNote(req,res){
    res.status(200).json({message:"Note is updates successfully"})
}

export function deleteNote(req,res){
    res.status(200).json({message:"Note is deleted successfully"})
}