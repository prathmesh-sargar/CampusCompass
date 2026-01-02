import { setUserInterviews } from "../../Features/Auth/interviewSlice";

import axios from "axios";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "../ui/button";

export default function InterviewDashBord() {
  const dispatch = useDispatch();
  const userInterviewList = useSelector(
    (state) => state.interview.userInterviews
  );

  useEffect(() => {
    const fetchAllInterview = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/aiinterview/getUserInterviews`
        );
        dispatch(setUserInterviews(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllInterview();
  }, [dispatch]);

  const handleDeleteInterview = async (interviewId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/aiinterview/interview/${interviewId}`
      );
      dispatch(
        setUserInterviews(
          userInterviewList.filter((i) => i._id !== interviewId)
        )
      );
      toast.success("Interview deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete interview.");
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] p-6">
      
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-center text-gray-100 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📋 Interview Dashboard
      </motion.h1>

      {/* CTA */}
      <div className="flex justify-center mb-10">
        <Link to="/AIJobForm">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transition"
          >
            Start New Interview
          </motion.button>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-gray-900/60 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-200 mb-6">
          📝 Interview List
        </h2>

        {userInterviewList.length === 0 ? (
          <p className="text-center text-gray-400">
            No interviews found. Start your first interview now!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userInterviewList.map((interview) => (
              <motion.div
                key={interview._id}
                whileHover={{ scale: 1.03 }}
                className="relative bg-gray-900/70 border border-gray-700 rounded-xl p-5 flex flex-col items-center transition hover:border-gray-500"
              >
                {/* Delete */}
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  onClick={() => handleDeleteInterview(interview._id)}
                >
                  <FiTrash2 size={18} />
                </Button>

                <h3 className="text-lg font-semibold text-gray-100 text-center">
                  {interview?.jobRole}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  📅 {interview?.updatedAt.toString().split("T")[0]}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link to={`/AI-Interivew/${interview?._id}`}>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition">
                      Start
                    </button>
                  </Link>

                  <Link to={`/AI-Interivew/${interview?._id}/score`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg shadow transition">
                      Feedback
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
