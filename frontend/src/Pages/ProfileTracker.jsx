import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import { FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiLeetcode,
  SiGithub,
  SiCodeforces,
  SiGeeksforgeeks,
} from "react-icons/si";

/* Platform Icons */
const platformIcons = {
  leetcode: <SiLeetcode className="w-5 h-5 text-yellow-400" />,
  github: <SiGithub className="w-5 h-5 text-gray-200" />,
  codeforces: <SiCodeforces className="w-5 h-5 text-blue-400" />,
  geeksforgeeks: <SiGeeksforgeeks className="w-5 h-5 text-green-400" />,
};

const ProfileTracker = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePlatformClick = (platform, username) => {
    if (username?.trim()) {
      navigate(`/profile/${platform}`);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-950 text-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* SIDEBAR */}
        <div className="flex flex-col gap-6">

          {/* PROFILE CARD */}
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-none rounded-2xl p-6 flex flex-col items-center gap-3 shadow-lg">
            <img
              src={"/dev.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
            />
            <h2 className="text-lg font-semibold text-white">
              {user?.name || "User"}
            </h2>
            <p className="text-xs text-white/70">
              Competitive Profile Tracker
            </p>
          </Card>

          {/* PLATFORMS */}
          <Card className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md">
            <div
              className="flex items-center justify-between cursor-pointer bg-gray-800 hover:bg-gray-750 p-3 rounded-xl transition"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="font-semibold text-gray-200">
                Platforms
              </span>
              <FaChevronUp
                className={`text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className="mt-4 flex flex-col gap-2">
                {Object.entries(user?.platforms || {})
                  .filter(([_, username]) => username?.trim())
                  .map(([platform, username]) => (
                    <div
                      key={platform}
                      onClick={() =>
                        handlePlatformClick(platform, username)
                      }
                      className="text-white flex items-center justify-between p-3 rounded-xl bg-gray-800 hover:bg-gray-700 cursor-pointer transition border border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        {platformIcons[platform]}
                        <span className="capitalize text-sm font-medium">
                          {platform}
                        </span>
                      </div>
                      <FaExternalLinkAlt className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileTracker;
