import { Navbar } from "../components/Navbar"
import { RateLimited } from "../components/RateLimited";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import {NoteCard} from "../components/NoteCard";
import { NotesNotFound } from "../components/NotesNotFound";


export const HomePage = () => {

  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/");
        setnotes(res.data)
        setRateLimited(false)
      } catch (e) {
        if (e.response?.status === 429) {
          setRateLimited(true);
        }
        else {
          toast.error("Failed to load notes")
        }
      } finally {
        setloading(false)
      }
    }

    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar></Navbar>

      {isRateLimited && <RateLimited></RateLimited>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound></NotesNotFound>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} setnotes={setnotes}></NoteCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
