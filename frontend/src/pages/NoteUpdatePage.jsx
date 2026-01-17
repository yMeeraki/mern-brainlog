import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2Icon } from "lucide-react";

const NoteUpdatePage = () => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    e.preventDefault()
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    } else {
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note Deleted Successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Error: Cannot Delete");
      }
    }
  };
  const handleSave = async () => {


    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All Fields Are Required!");
      return
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Created Successfully!");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to Create Note");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost btn-accent btn-outline">
                <ArrowLeft className="size-4" />
                <span>Back to Notes</span>
              </Link>
              <button
                onClick={(e) => handleDelete(e)}
                className="btn btn-error btn-outline"
              >
                <Trash2Icon className="size-4" />
                Delete
              </button>
            </div>
            {/* {loading && <Loading />} */}
            <div className="card bg-secondary/10 border border-secondary">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Update Note</h2>
                <form >
                  <div className="mb-4">
                    <label className="floating-label">
                      <input
                        type="text"
                        placeholder="Title"
                        className="input input-md w-full"
                        value={note.title}
                        onChange={(e) => setNote({...note,title:e.target.value})}
                      />
                      <span>Title</span>
                    </label>
                  </div>
                  <div className="mb-8">
                    <label className="floating-label">
                      <textarea
                        placeholder="Content"
                        className="textarea textarea-md w-full"
                        value={note.content}
                        onChange={(e) => setNote({...note,content:e.target.value})}
                      ></textarea>
                      <span>Content</span>
                    </label>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-accent"
                      disabled={saving}
                      type="submit"
                      onClick={handleSave}
                    >
                      {saving ? "Updating..." : "Update Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteUpdatePage;
