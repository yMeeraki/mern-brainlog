import Note from "../models/Note.js"

// Read: All Notes
export const getAllNotes = ( async ( _, res ) => {
  try {
    const notes = await Note.find().sort({createdAt:-1})
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error in getALLNotes Controller",error)
    res.status(500).json({message:"Internal Server Error"})
  }  
})

// Read: Note by Id
export const getNoteById = async (req, res) => {
  try {
    const noteById = await Note.findById(req.params.id)
    if(!noteById){
      return res.status(404).json({message:"Note not found"})
    }
    res.status(200).json(noteById)
  } catch (error) {
    
  }
}

//  Create: New Note
export const createNewNote = (async (req, res) =>{
  try {
    const {title,content} = req.body
    const newNote = new Note({title, content})
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    console.error("Error in createNewNote Controller",error)
    res.status(500).json({message:"Internal Server Error"})
  }
})

//  Update: Existing Note
export const updateExistingNote = (async (req,res) => {
  try {
    const {title, content} = req.body
    const updateNote = await Note.findByIdAndUpdate(req.params.id,
      {title,content},
      {new:true})
    if(!updateNote){
      return res.status(404).json({message:"Note Not Found"})
    }
      res.status(200).json(updateNote)
  } catch (error) {
    console.error("Error in createNewNote Controller",error)
    res.status(500).json({message:"Internal Server Error"})
  }
})

// Delete: Existing Note
export const deleteExistingNote = (async (req,res) => {
  try {
    
    const deleteNote = await Note.findByIdAndDelete(req.params.id) 
    if(!deleteNote){
      return res.status(404).json({message:"Note not Found"})
    }
    res.status(200).json({message:"Note Deleted Successfully"})
  } catch (error) {
    console.error("Error in createNewNote Controller",error)
    res.status(500).json({message:"Internal Server Error"})
  }
})
