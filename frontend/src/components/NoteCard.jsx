import { Trash2Icon, PenSquareIcon } from "lucide-react";
import toast from "react-hot-toast"

import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios.js"

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = (e, id) => {
    e.preventDefault()
    if(!window.confirm("Are you sure you want to delete this note?")){
      return
    }
    else{
      try {
        api.delete(`/notes/${id}`)
        setNotes((prev) => prev.filter(note => note._id !== id))
        toast.success("Note Deleted Successfully!")
      } catch (error) {
        toast.error("Error: Cannot Delete")
      }
    }
  }
  
  return (
    <Link
      to={`/${note._id}`}
      className="card hover:shadow-lg transition-all duration-200 border-t-4 border-secondary/50 bg-primary/10"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">  
          <span className="text-base-content/50 text-sm">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
