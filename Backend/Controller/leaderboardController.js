// import User from "../Model/User.js";
// import Resume from "../Model/Resume.js";

// /**
//  * GET /api/leaderboard
//  * Simple leaderboard data (v1)
//  * - Includes all users
//  * - Includes resume presence
//  * - Safe for future ranking logic
//  */
// const handleGetLeaderboard = async (req, res) => {
//   try {
//     // Fetch all users (exclude sensitive fields)
//     const users = await User.find({})
//       .select("name profilePic platforms email")
//       .lean();

//     // Fetch all resumes
//     const resumes = await Resume.find({})
//       .select("userId data.createdAt")
//       .lean();

//     // Create lookup map for resumes
//     const resumeMap = new Map();
//     resumes.forEach((resume) => {
//       resumeMap.set(resume.userId.toString(), resume);
//     });

//     // Merge user + resume info
//     const leaderboardUsers = users.map((user) => {
//       const resume = resumeMap.get(user._id.toString());

//       return {
//         userId: user._id,
//         name: user.name,
//         profilePic: user.profilePic,
//         platforms: user.platforms,

//         hasResume: !!resume,
//         resumeCreatedAt: resume?.createdAt || null,

//         // placeholders for future
//         category: resume ? "Detected Later" : "Not Available",
//         score: null,
//       };
//     });

//     return res.status(200).json({
//       totalUsers: leaderboardUsers.length,
//       users: leaderboardUsers,
//     });
//   } catch (error) {
//     console.error("Leaderboard fetch error:", error.message);
//     return res.status(500).json({
//       error: "Failed to fetch leaderboard data",
//     });
//   }
// };

// export { handleGetLeaderboard };

import User from "../Model/User.js";
import Resume from "../Model/Resume.js";

/**
 * GET /api/leaderboard
 * Enriched leaderboard data with resume highlights
 */
const handleGetLeaderboard = async (req, res) => {
  try {
    // 1️⃣ Fetch users
    const users = await User.find({})
      .select("name profilePic platforms")
      .lean();

    // 2️⃣ Fetch resumes
    const resumes = await Resume.find({})
      .select("userId data createdAt")
      .lean();

    // 3️⃣ Build resume lookup
    const resumeMap = new Map();
    resumes.forEach((resume) => {
      resumeMap.set(resume.userId.toString(), resume);
    });

    // 4️⃣ Merge + extract leaderboard-safe fields
    const leaderboardUsers = users.map((user) => {
      const resume = resumeMap.get(user._id.toString());
      const data = resume?.data;

      // Extract skills (top-level flatten)
      const skills = data?.skills
        ? Object.values(data.skills).flat().slice(0, 6)
        : [];

      return {
        userId: user._id,
        name: user.name,
        profilePic: user.profilePic,
        platforms: user.platforms,

        hasResume: !!resume,
        resumeCreatedAt: resume?.createdAt || null,

        // 🔹 Resume highlights (SAFE)
        summary: data?.summary
          ? data.summary.slice(0, 120) + "..."
          : null,

        primarySkills: skills,
        experienceCount: data?.experience?.length || 0,
        projectCount: data?.projects?.length || 0,

        // placeholders (next phase)
        category: resume ? "Detected Later" : "Not Available",
        score: null,
      };
    });

    return res.status(200).json({
      totalUsers: leaderboardUsers.length,
      users: leaderboardUsers,
    });
  } catch (error) {
    console.error("Leaderboard fetch error:", error.message);
    return res.status(500).json({
      error: "Failed to fetch leaderboard data",
    });
  }
};

export { handleGetLeaderboard };