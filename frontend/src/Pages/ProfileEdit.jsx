import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces } from "react-icons/si";
import { MdWarning } from "react-icons/md";
import { editUser } from "../Features/Auth/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileEdit = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name);
  const [email] = useState(user?.email);
  const [platforms, setPlatforms] = useState({
    github: user?.platforms?.github || "",
    leetcode: user?.platforms?.leetcode || "",
    geeksforgeeks: user?.platforms?.geeksforgeeks || "",
    codeforces: user?.platforms?.codeforces || "",
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPlatforms({
        github: user.platforms?.github || "",
        leetcode: user.platforms?.leetcode || "",
        geeksforgeeks: user.platforms?.geeksforgeeks || "",
        codeforces: user.platforms?.codeforces || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setPlatforms({ ...platforms, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      dispatch(editUser({ name, platforms }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 md:p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Edit Profile
      </h2>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Email */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Platforms */}
      <h3 className="text-xl font-semibold text-gray-200 text-center mb-6">
        Coding Platforms
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(platforms).map((platform) => (
          <PlatformItem
            key={platform}
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            icon={getPlatformIcon(platform)}
            value={platforms[platform]}
            name={platform}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveChanges}
        disabled={loading}
        className={`w-full mt-10 py-3 rounded-xl font-semibold text-lg transition
          ${
            loading
              ? "bg-blue-500/50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white shadow-lg`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

/* PLATFORM ITEM */
const PlatformItem = ({ icon, label, value, name, onChange }) => (
  <div className="flex items-center gap-4 bg-gray-950 border border-gray-800 rounded-xl p-4">
    <div className="text-xl">{icon}</div>
    <div className="w-28 text-gray-300 font-medium">{label}</div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Username"
      className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const getPlatformIcon = (platform) => {
  const icons = {
    github: <FaGithub className="text-gray-300" />,
    leetcode: <SiLeetcode className="text-orange-400" />,
    geeksforgeeks: <SiGeeksforgeeks className="text-green-400" />,
    codeforces: <SiCodeforces className="text-blue-400" />,
  };
  return icons[platform] || <MdWarning className="text-gray-400" />;
};

export default ProfileEdit;
