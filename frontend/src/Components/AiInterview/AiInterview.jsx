import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setSingleInterview } from "../../Features/Auth/interviewSlice";

const AiInterview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const singleInterview = useSelector(
    (state) => state.interview.singleInterview
  );

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/aiinterview/get/${interviewId}`
        );
        dispatch(setSingleInterview(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchInterviewData();
  }, [dispatch, interviewId]);

  const handleRetryInterview = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/aiinterview/reset/${interviewId}`
      );
      navigate(`/AI-Interivew/${interviewId}/start`);
    } catch (error) {
      console.error("❌ Failed to reset interview:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen pt-[80px] bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-100 mb-3">
          AI Interview Details
        </h1>
        <p className="text-lg text-gray-400">
          Review your interview before starting
        </p>
      </div>

      {/* Main Card */}
      <motion.div
        className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur border border-gray-700 rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {singleInterview?.jobRole || "Interview Position"}
              </h2>
              <p className="text-blue-100">
                {singleInterview?.experienceLevel || 0} years experience
                required
              </p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full self-start">
              <span className="text-white font-medium">
                {singleInterview?.questions?.length || 0} Questions
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "Scheduled Date",
                value: singleInterview?.createdAt
                  ? new Date(singleInterview.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Not specified",
              },
              {
                title: "Estimated Duration",
                value: singleInterview?.questions?.length
                  ? `${Math.ceil(
                      singleInterview.questions.length * 2.5
                    )} minutes`
                  : "Not specified",
              },
              {
                title: "Current Status",
                badge: singleInterview?.finalScore
                  ? {
                      text: `Completed (${singleInterview.finalScore}%)`,
                      color: "green",
                    }
                  : { text: "Not Started", color: "yellow" },
              },
              {
                title: "Difficulty",
                badge:
                  singleInterview?.experienceLevel >= 5
                    ? { text: "Advanced", color: "red" }
                    : singleInterview?.experienceLevel >= 3
                    ? { text: "Intermediate", color: "purple" }
                    : { text: "Beginner", color: "green" },
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-900/70 border border-gray-700 rounded-xl p-5"
              >
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  {item.title}
                </h3>
                {item.badge ? (
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      item.badge.color === "green"
                        ? "bg-green-900/40 text-green-300"
                        : item.badge.color === "yellow"
                        ? "bg-yellow-900/40 text-yellow-300"
                        : item.badge.color === "red"
                        ? "bg-red-900/40 text-red-300"
                        : "bg-purple-900/40 text-purple-300"
                    }`}
                  >
                    {item.badge.text}
                  </span>
                ) : (
                  <p className="text-gray-300">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Job Description */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Job Description
            </h3>
            <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-5">
              <p className="text-gray-300 whitespace-pre-line">
                {singleInterview?.jobDescription ||
                  "No job description provided."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
            <motion.button
              onClick={() =>
                navigate(`/AI-Interivew/${interviewId}/start`)
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium text-lg shadow-lg"
            >
              {singleInterview?.finalScore
                ? "Retry Interview"
                : "Begin Interview"}
            </motion.button>

            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-200 py-3 rounded-xl font-medium text-lg"
            >
              Go Back
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AiInterview;
