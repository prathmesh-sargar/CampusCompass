import { useState } from "react";
import axios from "axios";
import {
  FaSpinner,
  FaCheckCircle,
  FaFilePdf,
  FaSearch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FiUpload, FiAlertCircle } from "react-icons/fi";



function ATSResume() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("React Developer");
  const [jobs, setJobs] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError("");
      setResponse(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a resume (PDF format).");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);
    setJobs([]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResponse(res.data);

      const jobRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/jobs?category=${category}`
      );
      setJobs(jobRes.data);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Upload Card */}
        <div className="bg-gray-900/60 backdrop-blur border border-gray-700 rounded-2xl mb-8">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Your Resume (PDF)
                </label>

                <div className="flex justify-center px-6 pt-6 pb-6 border-2 border-dashed border-gray-700 rounded-xl bg-gray-900/40">
                  <div className="text-center space-y-2">
                    {file ? (
                      <div className="flex items-center justify-center gap-2">
                        <FaFilePdf className="h-10 w-10 text-red-400" />
                        <span className="text-sm font-medium text-gray-200 truncate max-w-xs">
                          {fileName}
                        </span>
                      </div>
                    ) : (
                      <>
                        <FiUpload className="h-10 w-10 mx-auto text-gray-400" />
                        <div className="text-sm text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer text-blue-400 hover:underline"
                          >
                            Upload a file
                            <input
                              id="file-upload"
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <span className="ml-1">or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Job Category
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 flex gap-2">
                  <FiAlertCircle className="text-red-400 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !file}
                className={`w-full flex justify-center items-center py-3 rounded-md text-sm font-medium text-white transition ${
                  loading || !file
                    ? "bg-blue-800 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Analyzing…
                  </>
                ) : (
                  "Analyze Resume & Find Jobs"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {response && (
          <div className="space-y-8">

            {/* Analysis */}
            <div className="bg-gray-900/60 backdrop-blur border border-gray-700 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaCheckCircle className="text-green-400 h-6 w-6" />
                <h2 className="text-2xl font-bold text-gray-100">
                  Analysis Results
                </h2>
              </div>

              {/* Match */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>ATS Compatibility</span>
                  <span className="font-semibold text-blue-400">
                    {response.matchPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      response.matchPercentage >= 70
                        ? "bg-green-500"
                        : response.matchPercentage >= 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${response.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Strengths */}
              <Section title="Strengths" color="green" items={response.strengths} />

              {/* Missing */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {response.missingKeywords.map((k, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-red-900/40 text-red-300 border border-red-800"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <Section title="Suggestions" color="blue" items={response.suggestions} />

              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  Summary
                </h3>
                <p className="text-gray-300 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
                  {response.summary}
                </p>
              </div>
            </div>

            {/* Jobs */}
            {jobs.length > 0 && (
              <div className="bg-gray-900/60 backdrop-blur border border-gray-700 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">
                  Recommended Jobs
                </h2>
                <div className="space-y-4">
                  {jobs.map((job, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-500 transition"
                    >
                      <div className="flex gap-4">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="h-12 w-12 rounded bg-white p-1"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-100">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-400">{job.company}</p>
                          <div className="text-sm text-gray-400 mt-1">
                            📍 {job.location} · 💰 {job.stipend}
                          </div>
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-400 hover:underline mt-2"
                          >
                            View Job <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const Section = ({ title, color, items }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-100 mb-3">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-gray-300 text-sm">
          • {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ATSResume;
