import { motion } from "framer-motion";
import { Brain, Trophy, FileText, Users, BarChart3, Rocket } from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI Career Mentor",
    description:
      "Personalized guidance powered by your coding profiles and resume data.",
  },
  {
    icon: <Trophy size={28} />,
    title: "AI Interview Simulator",
    description:
      "Practice realistic interview scenarios with instant performance feedback.",
  },
  {
    icon: <FileText size={28} />,
    title: "Resume Analyzer",
    description:
      "Get ATS score, improvement suggestions, and optimization tips.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Progress Tracker",
    description:
      "Monitor your LeetCode, GitHub, and coding growth in one dashboard.",
  },
  {
    icon: <Users size={28} />,
    title: "Community Hub",
    description:
      "Connect with peers, share activities, and grow together.",
  },
  {
    icon: <Rocket size={28} />,
    title: "Leaderboard",
    description:
      "Compete with others and stay motivated through rankings.",
  },
];

const CoreFeaturesSection = () => {
  return (
    <section className="relative py-24 px-6 ">
      
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Everything You Need To{" "}
          <span className="text-purple-500">Crack Placements</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          CampusCompass is your all-in-one career command center —
          track progress, optimize resume, practice interviews, and
          grow smarter with AI.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-lg hover:border-purple-500/50 transition-all"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 mb-6 group-hover:bg-purple-600/30 transition">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-all" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CoreFeaturesSection;