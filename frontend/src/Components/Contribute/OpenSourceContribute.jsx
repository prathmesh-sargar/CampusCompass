import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Github } from "lucide-react";
import { motion } from "framer-motion";

const languages = [
  "javascript",
  "python",
  "java",
  "typescript",
  "go",
  "cpp",
  "rust",
  "php",
  "csharp",
];

const OpenSourceContribute = () => {
  const [language, setLanguage] = useState("javascript");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contribute/opensource?tech=${language}&page=1&perPage=20`
      );
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data = await res.json();
      setIssues(data?.items || []);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch issues. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [language]);

  return (
    <div className="pt-[80px] min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] text-gray-200 flex flex-col items-center py-10 px-4 relative overflow-hidden">
      
      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-6 text-gray-100 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧭 Explore Open Source Issues
      </motion.h1>

      {/* Language Dropdown */}
      <div className="mb-8 w-full max-w-xs">
        <Select onValueChange={(val) => setLanguage(val)} defaultValue={language}>
          <SelectTrigger className="w-full bg-gray-900/60 border border-gray-700 text-gray-200">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border border-gray-700">
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center mt-10">
          <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400 font-medium mt-4">{error}</p>
      )}

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {!loading &&
          issues.map((issue, index) => (
            <motion.div
              key={issue.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="rounded-2xl bg-gray-900/60 backdrop-blur border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-1">
                
                <CardHeader>
                  <div className="flex justify-between items-start gap-3">
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <CardTitle className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition line-clamp-1">
                        {issue.title}
                      </CardTitle>
                    </a>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 flex items-center mt-2 gap-1">
                    <Github size={18} />
                    <a
                      href={issue.repository_url.replace(
                        "api.github.com/repos",
                        "github.com"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline truncate"
                    >
                      {issue.repository_url
                        .split("/")
                        .slice(-2)
                        .join("/")}
                    </a>
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {issue.body || "No description available."}
                  </p>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {issue.labels?.length > 0 ? (
                      issue.labels.map((label) => (
                        <span
                          key={label.id}
                          className="px-2 py-1 text-xs rounded-md font-semibold"
                          style={{
                            backgroundColor: `#${label.color || "ddd"}`,
                            color: "#000",
                          }}
                        >
                          {label.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">
                        No labels
                      </span>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={issue.user?.avatar_url}
                      alt={issue.user?.login}
                      className="w-8 h-8 rounded-full border border-gray-600"
                    />
                    <a
                      href={issue.user?.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-300 hover:text-blue-400"
                    >
                      {issue.user?.login}
                    </a>
                  </div>

                  {/* Assigned Developers */}
                  <div className="bg-red-900/30 text-red-400 text-sm py-1.5 rounded-lg text-center font-medium mb-4 border border-red-800/40">
                    Assigned Developers: {issue.assignees?.length || 0}
                  </div>

                  {/* View Button */}
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Issue
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

      {/* No Data */}
      {!loading && issues.length === 0 && (
        <p className="mt-10 text-gray-400 text-center font-medium">
          😕 No issues found for {language.toUpperCase()}.
        </p>
      )}
    </div>
  );
};

export default OpenSourceContribute;
