import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setAIquestions } from "../../Features/Auth/interviewSlice";

export default function JobForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/aiinterview/create`,
        data
      );
      dispatch(setAIquestions(response.data.newInterview));
      navigate(`/AI-Interivew/${response.data.newInterview._id}`);
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to create interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-gray-900/80 backdrop-blur border border-gray-800 rounded-2xl p-8 shadow-xl"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Interview Setup
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Provide details to generate your AI-powered interview
          </p>
        </div>

        <div className="space-y-6">
          {/* JOB ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("jobRole", { required: "Job role is required" })}
              placeholder="e.g. Frontend Engineer"
              className={`w-full px-4 py-3 rounded-xl bg-gray-950 border ${
                errors.jobRole ? "border-red-500" : "border-gray-700"
              } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            {errors.jobRole && (
              <p className="mt-1 text-sm text-red-500">
                {errors.jobRole.message}
              </p>
            )}
          </div>

          {/* JOB DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              {...register("jobDescription", {
                required: "Job description is required",
              })}
              placeholder="Paste job description here..."
              className={`w-full px-4 py-3 rounded-xl bg-gray-950 border ${
                errors.jobDescription ? "border-red-500" : "border-gray-700"
              } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none`}
            />
            {errors.jobDescription && (
              <p className="mt-1 text-sm text-red-500">
                {errors.jobDescription.message}
              </p>
            )}
          </div>

          {/* EXPERIENCE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Experience (years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("experienceLevel", {
                required: "Experience level is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
              placeholder="e.g. 2"
              className={`w-full px-4 py-3 rounded-xl bg-gray-950 border ${
                errors.experienceLevel ? "border-red-500" : "border-gray-700"
              } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            {errors.experienceLevel && (
              <p className="mt-1 text-sm text-red-500">
                {errors.experienceLevel.message}
              </p>
            )}
          </div>

          {/* ERROR */}
          {submitError && (
            <div className="bg-red-900/40 border border-red-700 text-red-400 rounded-lg p-3 text-sm">
              {submitError}
            </div>
          )}

          {/* SUBMIT */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full py-3 rounded-xl font-semibold tracking-wide ${
              isLoading
                ? "bg-blue-700/60 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Generating Questions...
              </div>
            ) : (
              "Start Interview"
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
