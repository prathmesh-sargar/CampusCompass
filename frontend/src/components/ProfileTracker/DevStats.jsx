import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import LanguageProficiencyChart from "./LanguageProficiencyChart";
import GitHubStats from "./GitHubStats";

function DevStats() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [activedays, setactivedays] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/profile/github?refresh=true`
        );

        setTotalContributions(data.totalContributions);
        setLanguages(data.languages || []);
        setStats(data.stats);
        setactivedays(data.activeDays);

        const formattedData =
          data.heatmap?.map((entry) => ({
            date: entry.date,
            count: entry.contributionCount,
          })) || [];

        setHeatmapData(formattedData);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-gray-900 border border-gray-800 rounded-2xl">
        <div className="text-gray-400 text-sm tracking-wide animate-pulse">
          Loading GitHub analytics…
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ===== TOP SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* STATS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Total Contributions" value={totalContributions} />
          <StatCard title="Active Days" value={activedays} />
        </div>

        {/* HEATMAP */}
        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-200 font-semibold">
              Contribution Activity
            </h3>
            <span className="text-xs text-gray-500">
              Last 12 months
            </span>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 min-w-[720px]">
              <CalendarHeatmap
                startDate={
                  new Date(new Date().setDate(new Date().getDate() - 365))
                }
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
                  if (!value || value.count === 0) return "fill-gray-800";
                  if (value.count === 1) return "fill-green-700";
                  if (value.count === 2) return "fill-green-600";
                  if (value.count === 3) return "fill-green-500";
                  if (value.count === 4) return "fill-green-400";
                  return "fill-green-300";
                }}
                gutterSize={3}
              />
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="w-3 h-3 bg-gray-800 rounded-sm" />
              <span className="w-3 h-3 bg-green-700 rounded-sm" />
              <span className="w-3 h-3 bg-green-600 rounded-sm" />
              <span className="w-3 h-3 bg-green-500 rounded-sm" />
              <span className="w-3 h-3 bg-green-400 rounded-sm" />
              <span className="w-3 h-3 bg-green-300 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
            <LanguageProficiencyChart data={languages} />
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
          <GitHubStats data={stats} />
        </div>
      </div>
    </div>
  );
}

/* ===== STAT CARD ===== */
const StatCard = ({ title, value }) => (
  <div className="flex flex-col items-center justify-center gap-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
    <p className="text-sm text-gray-400 tracking-wide">{title}</p>
    <span className="text-5xl font-extrabold text-gray-100">
      {value}
    </span>
  </div>
);

export default DevStats;
