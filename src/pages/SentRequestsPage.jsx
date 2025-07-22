import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SentRequestsPage() {
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests you sent
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/requests/sent`,
          { withCredentials: true }
        );
        if (isMounted) {
          console.log('Sent requests data:', data);
          console.log(
            'Receivers:',
            data.map((r, index) => ({
              index,
              id: r._id,
              receiver: r.receiver || 'MISSING RECEIVER',
              hasProfilePicture: r.receiver ? !!r.receiver.profilePicture : false,
            }))
          );
          setSent(data);
        }
      } catch {
        toast.error("Could not load sent requests");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => (isMounted = false);
  }, []);

  // Cancel a pending request
  const handleCancel = async (receiverId) => {
    if (!receiverId) {
      toast.error("Cannot cancel request: Invalid receiver");
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/request/cancel/${receiverId}`,
        { withCredentials: true }
      );
      toast.success("Request cancelled");
      setSent((prev) => prev.filter((r) => r.receiver?._id !== receiverId));
    } catch (err) {
      toast.error(err.response?.data || "Failed to cancel");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
        <p className="text-xl animate-pulse">Loading…</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Sent Requests</h1>

      {sent.length === 0 ? (
        <p>You haven’t sent any requests yet 💌</p>
      ) : (
        <ul className="space-y-4">
          {sent.map((r) => (
            <li
              key={r._id}
              className="bg-white/20 p-4 rounded-2xl flex items-center gap-4"
            >
              {r.receiver ? (
                <>
                  <img
                    src={r.receiver.profilePicture || '/default-profile.png'}
                    alt={`${r.receiver.firstName || 'Unknown'} ${r.receiver.lastName || 'User'}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {r.receiver.firstName || 'Unknown'} {r.receiver.lastName || 'User'}
                    </p>
                    {r.status === "pending" && (
                      <button
                        onClick={() => handleCancel(r.receiver._id)}
                        className="mt-1 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel ❌
                      </button>
                    )}
                    {r.status !== "pending" && (
                      <span className="text-xs text-gray-200">
                        {r.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-red-300">
                  Invalid request: Receiver information missing
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
