import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { setSingleInterview } from "../../Features/Auth/interviewSlice";
import {
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";

const ScorePage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const InterviewData = useSelector(
    (state) => state.interview.singleInterview
  );

  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInterviewData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/aiinterview/get/${interviewId}`
        );
        dispatch(setSingleInterview(response.data));
      } catch (error) {
        console.error("Error fetching interview:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterviewData();
  }, [dispatch, interviewId]);

  const createChartData = (value, color, name) => [
    { value: value || 0, fill: color, name },
  ];

  const getPerformanceText = (score, good, mid, poor) =>
    score >= 70 ? good : score >= 40 ? mid : poor;

  return (
    <div className="min-h-screen pt-20 bg-gray-950 text-gray-200">
      {isLoading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-60" />
        </div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto px-4 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate("/ainterview")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-600 transition"
            >
              <FiArrowLeft />
              Dashboard
            </motion.button>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Interview Insights
            </h1>

            <div className="w-10" />
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Confidence */}
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-blue-400">
                Confidence
              </h2>

              <div className="h-48">
                <ResponsiveContainer>
                  <RadialBarChart
                    innerRadius="40%"
                    outerRadius="90%"
                    data={createChartData(
                      InterviewData?.confidence,
                      "#3b82f6",
                      "Confidence"
                    )}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-100 text-3xl font-bold"
                    >
                      {InterviewData?.confidence || 0}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-center text-gray-400 italic">
                {getPerformanceText(
                  InterviewData?.confidence,
                  "Excellent confidence level",
                  "Good, but improve consistency",
                  "Practice will help build confidence"
                )}
              </p>
            </motion.div>

            {/* Eye Contact */}
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-green-400">
                Eye Contact
              </h2>

              <div className="h-48">
                <ResponsiveContainer>
                  <RadialBarChart
                    innerRadius="40%"
                    outerRadius="90%"
                    data={createChartData(
                      InterviewData?.eyecontact,
                      "#22c55e",
                      "Eye Contact"
                    )}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-100 text-3xl font-bold"
                    >
                      {InterviewData?.eyecontact || 0}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-center text-gray-400 italic">
                {getPerformanceText(
                  InterviewData?.eyecontact,
                  "Strong eye contact",
                  "Decent, but be consistent",
                  "Improve engagement with eye contact"
                )}
              </p>
            </motion.div>
          </div>

          {/* Question Analysis */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold">Question Analysis</h2>
              <p className="text-gray-400 text-sm">
                Detailed breakdown of your responses
              </p>
            </div>

            {InterviewData?.questions?.map((q, i) => (
              <div key={q._id} className="border-b border-gray-800 p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedQuestion(expandedQuestion === i ? null : i)
                  }
                >
                  <h3 className="font-medium">
                    {i + 1}. {q.questionText}
                  </h3>
                  {expandedQuestion === i ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>

                {expandedQuestion === i && (
                  <div className="mt-4 space-y-4 text-sm text-gray-300">
                    <div>
                      <span className="text-blue-400 font-semibold">
                        Your Answer:
                      </span>
                      <p className="bg-gray-800 p-3 rounded mt-1">
                        {q.userAnswer || "No answer provided"}
                      </p>
                    </div>

                    <div>
                      <span className="text-green-400 font-semibold">
                        Model Answer:
                      </span>
                      <p className="bg-gray-800 p-3 rounded mt-1">
                        {q.aiAnswer || "N/A"}
                      </p>
                    </div>

                    <div>
                      <span className="text-yellow-400 font-semibold">
                        Feedback:
                      </span>
                      <p className="bg-gray-800 p-3 rounded mt-1">
                        {q.aiFeedback || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-700 rounded">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${q.score * 10}%` }}
                        />
                      </div>
                      <span className="font-semibold">{q.score}/10</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={() => navigate("/ainterview")}
              className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <FiArrowLeft /> Dashboard
            </button>

            <button
              onClick={() =>
                navigate(`/AI-Interivew/${interviewId}/start`)
              }
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition"
            >
              <FiRefreshCw /> Practice Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScorePage;
