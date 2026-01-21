import { useEffect, useState } from "react";

const normalizeSkills = (skills) => {
  if (!skills) return [];

  const result = [];

  const process = (item) => {
    if (!item) return;

    if (typeof item === "string") {
      result.push(item);
    } else if (Array.isArray(item)) {
      item.forEach(process);
    } else if (typeof item === "object") {
      Object.values(item).forEach(process);
    }
  };

  process(skills);
  return result;
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/leaderboard`
        );

        if (!res.ok) throw new Error("Failed to fetch leaderboard");

        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <>
    <div className="bg-gray-950 pt-[80px]"></div>
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        🏆 CampusCompass Leaderboard
      </h1>

      <div className="max-w-6xl mx-auto space-y-6">
        {users.map((user, index) => {
          const skills = normalizeSkills(user.primarySkills).slice(0, 6);

          return (
            <div
              key={user.userId}
              className="bg-gray-900/70 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-lg hover:shadow-xl transition"
            >
              {/* Rank */}
              <div className="text-3xl font-bold text-purple-400 w-12">
                #{index + 1}
              </div>

              {/* Profile */}
              <div className="flex gap-4 flex-1">
                <img
                  src={user.profilePic?.url}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border border-gray-700"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{user.name}</h2>

                  <p className="text-sm text-gray-400">
                    {user.hasResume
                      ? "Resume analyzed"
                      : "Resume not uploaded"}
                  </p>

                  {user.summary && (
                    <p className="mt-2 text-sm text-gray-300">
                      {user.summary}
                    </p>
                  )}

                  {skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-indigo-800/40 text-indigo-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex md:flex-col gap-6 md:gap-2 text-sm text-gray-300 md:text-right">
                <div>
                  <span className="font-semibold">
                    {user.experienceCount}
                  </span>{" "}
                  Experience
                </div>
                <div>
                  <span className="font-semibold">
                    {user.projectCount}
                  </span>{" "}
                  Projects
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Leaderboard;
