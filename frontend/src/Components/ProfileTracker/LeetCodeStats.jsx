import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DSATopicAnalysis from "./DSATopicAnalysis";
import Stats from "./Stats";

const LeetCodeStats = () => {
  const [data, setData] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/profile/leetcode?refresh=true`
        );

        const result = response.data;
        setData(result);

        if (result.submissionCalendar) {
          const formattedData = Object.entries(
            result.submissionCalendar
          ).map(([timestamp, count]) => ({
            date: new Date(parseInt(timestamp) * 1000)
              .toISOString()
              .split("T")[0],
            count,
          }));

          setHeatmapData(formattedData);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[280px] bg-gray-900 border border-gray-800 rounded-2xl">
        <p className="text-gray-400 animate-pulse text-sm">
          Loading LeetCode analytics…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[280px] bg-gray-900 border border-red-800 rounded-2xl">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ===== TOP SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* STAT CARDS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard
            title="Total Questions Solved"
            value={
              data?.stats?.find((s) => s.difficulty === "All")?.count || 0
            }
          />
          <StatCard
            title="Active Days"
            value={heatmapData.length}
          />
        </div>

        {/* HEATMAP */}
        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-200 font-semibold">
              Submission Activity
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
                gutterSize={3}
                classForValue={(value) => {
                  if (!value || value.count === 0) return "fill-gray-800";
                  if (value.count === 1) return "fill-green-900/40";
                  if (value.count === 2) return "fill-green-800/60";
                  if (value.count === 3) return "fill-green-700";
                  if (value.count === 4) return "fill-green-600";
                  return "fill-green-500";
                }}
              />
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="w-3 h-3 bg-gray-800 rounded-sm" />
              <span className="w-3 h-3 bg-green-900 rounded-sm" />
              <span className="w-3 h-3 bg-green-700 rounded-sm" />
              <span className="w-3 h-3 bg-green-500 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ===== MIDDLE SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AWARDS */}
        <AwardsSection
          badges={data?.awards}
          showMore={showMore}
          setShowMore={setShowMore}
        />

        {/* DIFFICULTY STATS */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
          <Stats data={data?.stats} />
        </div>
      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
        <DSATopicAnalysis
          topicData={data?.topicAnalysisStats?.topicWiseDistribution || []}
        />
      </div>
    </div>
  );
};

/* ===== STAT CARD ===== */
const StatCard = ({ title, value }) => (
  <div className="flex flex-col items-center justify-center gap-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
    <p className="text-sm text-white">{title}</p>
    <span className="text-5xl font-extrabold text-gray-100">
      {value}
    </span>
  </div>
);

/* ===== AWARDS ===== */
const AwardsSection = ({ badges, showMore, setShowMore }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-gray-200 font-semibold">Awards</h3>
      <span className="text-sm text-gray-400">
        {badges?.length || 0}
      </span>
    </div>

    {badges?.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-4">
        {badges
          .slice(0, showMore ? badges.length : 4)
          .map((badge, index) => (
            <img
              key={index}
              src={badge.icon}
              alt={badge.name}
              className="w-16 h-16 rounded-lg bg-gray-800 p-2"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/64")
              }
            />
          ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm text-center">
        No awards yet
      </p>
    )}

    {badges?.length > 4 && (
      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300 w-full"
      >
        {showMore ? "Show less" : "Show more"}
        {showMore ? <FaChevronUp /> : <FaChevronDown />}
      </button>
    )}
  </div>
);

export default LeetCodeStats;
