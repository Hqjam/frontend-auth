import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/matches`,
          { withCredentials: true }
        );

        if (isMounted) setMatches(data);
      } catch {
        toast.error("Could not load matches");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => (isMounted = false);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
        <p className="text-xl animate-pulse">Loading matches…</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Matches</h1>

      {matches.length === 0 ? (
        <p className="text-lg">No matches yet – keep swiping! 🔥</p>
      ) : (
        <ul className="space-y-4">
          {matches.map(({ _id, other }) => (
            <li
              key={_id}
              className="bg-white/20 p-4 rounded-2xl flex items-center gap-4"
            >
              <img
                src={other.profilePicture}
                alt={`${other.firstName} ${other.lastName}`}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">
                  {other.firstName} {other.lastName}
                </p>
                {/* Placeholder for future chat button */}
                <button className="mt-1 text-sm bg-yellow-400 text-black px-3 py-1 rounded">
                  Chat 💬 (soon)
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}