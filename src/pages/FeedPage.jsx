// src/pages/FeedPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';

export default function FeedPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const loadFeed = async (p = 1) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/feed?page=${p}&limit=${limit}`,
        { withCredentials: true }
      );
      setUsers(data);
    } catch (err) {
      toast.error(err.response?.data || "Failed to load feed");
    }
  };

  useEffect(() => {
    loadFeed(page);
  }, [page]);

  const handleSwipe = async (id, action) => {
    if (action === "right") {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/request/send/${id}`,
          {},
          { withCredentials: true }
        );
        toast.success("Request sent!");
      } catch (err) {
        toast.error(err.response?.data || "Failed to send request");
      }
    }
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center py-10 px-4">
      <Navbar />
      <h1 className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg">
        Dev<span className="text-yellow-300">Swipe</span> 🔥
      </h1>

      <div className="w-full max-w-sm space-y-8">
        {users.length === 0 ? (
          <p className="text-white/80 text-center text-xl">No more devs around you 👀</p>
        ) : (
          users.map(u => (
            <div
              key={u._id}
              className="bg-white/20 backdrop-blur-md rounded-3xl p-6 text-white shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={u.profilePicture}
                  alt={u.firstName}
                  className="w-28 h-28 rounded-full border-4 border-white/50 object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-center">
                {u.firstName} {u.lastName} · {u.age}
              </h2>
              <p className="text-center text-white/90 mt-2 mb-6 text-sm">
                {u.about}
              </p>

              <div className="flex justify-around">
                <button
                  onClick={() => handleSwipe(u._id, "left")}
                  className="bg-red-400/80 hover:bg-red-500/90 rounded-full w-14 h-14 flex items-center justify-center text-2xl transition"
                >
                  ❌
                </button>
                <button
                  onClick={() => handleSwipe(u._id, "right")}
                  className="bg-green-400/80 hover:bg-green-500/90 rounded-full w-14 h-14 flex items-center justify-center text-2xl transition"
                >
                  💜
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex gap-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-full bg-white/20 text-white disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="px-4 py-2 rounded-full bg-white/20 text-white">
          {page}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={users.length < limit}
          className="px-4 py-2 rounded-full bg-white/20 text-white disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}