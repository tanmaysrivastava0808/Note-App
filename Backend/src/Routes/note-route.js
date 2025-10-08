import express from "express";
import { getAllNotes } from "../Contollers/note-controller.js";
import { createNote } from "../Contollers/note-controller.js";
import { updateNote } from "../Contollers/note-controller.js";
import { deleteNote } from "../Contollers/note-controller.js";
import { getNoteById } from "../Contollers/note-controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/note", createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;