import { useEffect, useState } from "react";

import api from "../lib/axios.js";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import toast from "react-hot-toast";
import Loading from "../components/Loading.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NoteNotFound from "../components/NoteNotFound.jsx";

// const success = () => toast.success('Successfully toasted!')
// const error = () => toast.error("OOPS")

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.log("Error in fetching data", error);
        if (error.response?.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to Load Notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4">
          {loading && <Loading />}
          {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound/>}

          {notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
