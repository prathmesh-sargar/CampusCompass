import { FaStar, FaCodeBranch, FaExclamationCircle } from "react-icons/fa";
import { FaCodeCommit } from "react-icons/fa6";

export default function GitHubStats({ data }) {
  const { stars, commits, pullRequests, issues } = data || {};

  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
      <h2 className="text-gray-200 text-lg font-semibold mb-4">
        GitHub Statistics
      </h2>

      <div className="flex flex-col gap-4">
        <StatItem
          icon={<FaStar className="text-yellow-400 w-5 h-5" />}
          name="Stars"
          value={stars}
        />

        <StatItem
          icon={<FaCodeCommit className="text-orange-400 w-5 h-5" />}
          name="Commits"
          value={commits}
        />

        <StatItem
          icon={<FaCodeBranch className="text-green-400 w-5 h-5" />}
          name="Pull Requests"
          value={pullRequests}
        />

        <StatItem
          icon={<FaExclamationCircle className="text-red-400 w-5 h-5" />}
          name="Issues"
          value={issues}
        />
      </div>
    </div>
  );
}

/* ---------------- STAT ITEM ---------------- */

const StatItem = ({ icon, name, value }) => (
  <div className="flex items-center justify-between bg-gray-950 border border-gray-800 rounded-xl px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800">
        {icon}
      </div>
      <span className="text-gray-300 font-medium">{name}</span>
    </div>

    <span className="text-xl font-bold text-gray-100">
      {value ?? 0}
    </span>
  </div>
);
