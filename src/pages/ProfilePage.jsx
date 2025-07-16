// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    about: "",
    profilePicture: "",
  });

  /* ---------- load current profile ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/profile/view`,
          { withCredentials: true }
        );
        setProfile(data);
      } catch (err) {
        toast.error("Could not load profile");
      }
    })();
  }, []);

  /* ---------- handle text fields ---------- */
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  /* ---------- handle file upload ---------- */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("profilePicture", file);

    // optional: send any other changed fields at the same time
    form.append("firstName", profile.firstName);
    form.append("lastName", profile.lastName);
    form.append("age", profile.age);
    form.append("about", profile.about);

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile/edit`,
        form,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile(data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data || "Upload failed");
    }
  };

  /* ---------- handle text-only save ---------- */
  const handleSave = async () => {
    try {
      const form = new FormData();
      Object.keys(profile).forEach((k) => form.append(k, profile[k]));
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile/edit`,
        form,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile(data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="max-w-md mx-auto bg-white/20 p-6 rounded-2xl space-y-4">
        {/* Preview */}
        {profile.profilePicture && (
          <img
            src={profile.profilePicture}
            alt="preview"
            className="w-28 h-28 rounded-full object-cover mx-auto"
          />
        )}

        {/* Text fields */}
        <input
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          placeholder="First name"
          className="w-full p-2 rounded bg-white/10"
        />
        <input
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          placeholder="Last name"
          className="w-full p-2 rounded bg-white/10"
        />
        <input
          name="age"
          type="number"
          min="18"
          value={profile.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-2 rounded bg-white/10"
        />
        <textarea
          name="about"
          value={profile.about}
          onChange={handleChange}
          maxLength="300"
          placeholder="About me"
          rows="3"
          className="w-full p-2 rounded bg-white/10"
        />

        {/* File picker */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
        />

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full bg-green-500 hover:bg-green-600 p-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}