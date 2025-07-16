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
        setRequests(data);
      } catch (err) {
        toast.error("Could not load requests");
      }
    })();
  }, []);

  // RequestsPage.jsx
  const handleAccept = async (requestDoc) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/accept/${
          requestDoc.sender._id
        }`,
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
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/request/reject/${
          requestDoc.sender._id
        }`,
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
              className="bg-white/20 p-4 rounded-2xl flex items-center gap-4">
              <img
                src={r.sender.profilePicture}
                alt={r.sender.firstName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">
                  {r.sender.firstName} {r.sender.lastName}
                </p>
                <button
                  onClick={() => handleAccept(r)}
                  className="bg-green-400 hover:bg-green-500 p-2 rounded-full">
                  Accept 💌
                </button>
                <button
                  onClick={() => handleReject(r)}
                  className="bg-red-400 hover:bg-red-500 p-2 rounded-full">
                  Reject ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
