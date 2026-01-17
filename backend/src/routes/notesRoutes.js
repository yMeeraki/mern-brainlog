import express from "express"
import {getAllNotes, createNewNote, updateExistingNote, deleteExistingNote, getNoteById} from "../controllers/notesControllers.js"


const router = express.Router()


// Read: All Notes
router.get("/", getAllNotes)
router.get("/:id", getNoteById)


//  Create: New Note
router.post("/", createNewNote)

//  Update: Existing Note
router.put("/:id", updateExistingNote)

// Delete: Existing Note
router.delete("/:id", deleteExistingNote)



export default router