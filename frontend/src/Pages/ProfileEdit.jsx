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
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black py-16 px-4">
    <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-2xl border border-gray-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(139,92,246,0.35)] p-8 md:p-12">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Edit <span className="text-purple-400">Profile</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Manage your personal details & coding platforms
        </p>
      </div>

      {/* Name */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-950/70 border border-gray-700 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
        />
      </div>

      {/* Email */}
      <div className="mb-12">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Platforms Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white text-center mb-8">
          Coding Platforms
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveChanges}
        disabled={loading}
        className={`w-full mt-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg
          ${
            loading
              ? "bg-purple-500/40 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          } text-white`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </div>
);
};

/* PLATFORM ITEM */
const PlatformItem = ({ icon, label, value, name, onChange }) => (
  <div className="flex items-center gap-4 bg-gray-950/60 backdrop-blur-lg border border-gray-800 rounded-2xl p-5 transition-all hover:border-purple-600 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.4)]">
    
    <div className="text-2xl">{icon}</div>

    <div className="w-32 text-gray-300 font-medium">{label}</div>

    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Username"
      className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
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
