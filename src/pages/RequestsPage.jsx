import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/requests/pending`,
          { withCredentials: true }
        );
        console.log('Requests data:', data);
        console.log(
          'Senders:',
          data.map((r, index) => ({
            index,
            id: r._id,
            sender: r.sender || 'MISSING SENDER',
            hasProfilePicture: r.sender ? !!r.sender.profilePicture : false,
          }))
        );
        setRequests(data);
      } catch (err) {
        toast.error("Could not load requests");
        console.error('Error fetching requests:', err);
      }
    })();
  }, []);

  const handleAccept = async (requestDoc) => {
    if (!requestDoc.sender?._id) {
      toast.error("Cannot accept request: Invalid sender");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/accept/${requestDoc.sender._id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Request accepted!");
      setRequests((prev) => prev.filter((r) => r._id !== requestDoc._id));
    } catch (err) {
      toast.error(err.response?.data || "Failed to accept request");
    }
  };

  const handleReject = async (requestDoc) => {
    if (!requestDoc.sender?._id) {
      toast.error("Cannot reject request: Invalid sender");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/reject/${requestDoc.sender._id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Request rejected!");
      setRequests((prev) => prev.filter((r) => r._id !== requestDoc._id));
    } catch (err) {
      toast.error(err.response?.data || "Failed to reject request");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Incoming Requests</h1>

      {requests.length === 0 ? (
        <p>No pending requests 👀</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((r) => (
            <li
              key={r._id}
              className="bg-white/20 p-4 rounded-2xl flex items-center gap-4"
            >
              {r.sender ? (
                <>
                  <img
                    src={r.sender.profilePicture || '/default-profile.png'} // Fallback image
                    alt={`${r.sender.firstName || 'Unknown'} ${r.sender.lastName || 'User'}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {r.sender.firstName || 'Unknown'} {r.sender.lastName || 'User'}
                    </p>
                    <button
                      onClick={() => handleAccept(r)}
                      className="bg-green-400 hover:bg-green-500 p-2 rounded-full"
                    >
                      Accept 💌
                    </button>
                    <button
                      onClick={() => handleReject(r)}
                      className="bg-red-400 hover:bg-red-500 p-2 rounded-full"
                    >
                      Reject ❌
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-red-300">
                  Invalid request: Sender information missing
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
