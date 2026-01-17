import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields Are Required!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
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
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to="/" className="btn btn-ghost btn-accent mb-6 flex-1">
              <ArrowLeft className="size-4" />
              <span>Back to Notes</span>
            </Link>

            <div className="card bg-secondary/10 border border-secondary">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="floating-label">
                      <input
                        type="text"
                        placeholder="Title"
                        className="input input-md w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <span>Title</span>
                    </label>
                  </div>
                  <div className="mb-8">
                    <label className="floating-label">
                      <textarea
                        placeholder="Content"
                        className="textarea textarea-md w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                      <span>Content</span>
                    </label>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-accent"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Creating..." : "Create Note"}
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

export default CreatePage;
