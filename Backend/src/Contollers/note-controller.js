import Note from "../model/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (e) {
    console.log("Error in getAllNotes controller", e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const createNote = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({ title, content });
    const saveNote = await newNote.save();
    res.status(201).json(saveNote);
  } catch (e) {
    console.log("Error while creating a note", e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const updateNote = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (e) {
    console.log("Error while updating a note", e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      "Deleted Note is: ": deletedNote
    });
  } catch (e) {
    console.log("Error while deleting a note", e);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const getNoteById = async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);

    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(notes);
  } catch (e) {
    console.log("Error in getNoteById", e);
    res.status(500).json({ msg: "Internal server error" });
  }
}