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
import { Loader2 } from "lucide-react";
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
        `http://localhost:4000/api/contribute/opensource?tech=${language}&page=1&perPage=20`
      );
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data = await res.json();
      console.log("fetch data : ", data.items);

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
    <div className=" mt-[80px] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-10 px-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🔍 Explore Open Source Issues
      </motion.h1>

      {/* Dropdown */}
      <div className="mb-6 w-full max-w-xs">
        <Select
          onValueChange={(val) => setLanguage(val)}
          defaultValue={language}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
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
          <Loader2 className="animate-spin text-gray-700 w-8 h-8" />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 font-medium mt-4">{error}</p>}

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl overflow-y-auto">
        {!loading &&
          issues?.map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                    {issue?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Repo:{" "}
                    <a
                      href={issue?.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {issue?.repoName}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-3">
                    {issue?.body || "No description available."}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {issue?.labels?.length > 0 ? (
                      issue.labels.map((label) => (
                        <span
                          key={label.id}
                          className="px-2 py-1 text-xs rounded-md"
                          style={{
                            backgroundColor: `#${label.color || "ddd"}`,
                            color: "#fff",
                          }}
                        >
                          {label.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">No labels</span>
                    )}
                  </div>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a
                      href={issue?.url}
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

      {/* No Data Message */}
      {!loading && issues.length === 0 && (
        <p className="mt-10 text-gray-600 text-center font-medium">
          😕 No issues found for {language.toUpperCase()}.
        </p>
      )}
    </div>
  );
};

export default OpenSourceContribute;
