// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// function ChatGemini() {
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleAskQuestion = async () => {
//     if (!question.trim()) return;

//     setLoading(true);
//     setError("");

//     setMessages((prev) => [...prev, { type: "user", text: question }]);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/aiagent`,
//         { question }
//       );
//       setMessages((prev) => [
//         ...prev,
//         { type: "ai", text: res.data.aiResponse },
//       ]);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//       setQuestion("");
//     }
//   };

//   return (
//     <div className="py-10 h-screen flex flex-col bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a]">

//       {/* Chat Area */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto px-6 py-8 space-y-4"
//       >
//         {messages.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="h-full flex flex-col items-center justify-center text-center text-gray-400"
//           >
//             <div className="w-28 h-28 mb-6 opacity-20">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-200 mb-2">
//               Ask CampusCompass AI
//             </h2>
//             <p className="max-w-md text-gray-400 mb-6">
//               Get instant help with tech, careers, interviews, and learning.
//             </p>

//             <div className="grid grid-cols-2 gap-3 w-full max-w-md">
//               {[
//                 "Explain React hooks",
//                 "Resume improvement tips",
//                 "DSA roadmap",
//                 "System design basics",
//               ].map((s) => (
//                 <motion.button
//                   key={s}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
//                   onClick={() => setQuestion(s)}
//                 >
//                   {s}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         <AnimatePresence>
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className={`flex ${
//                 msg.type === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`relative max-w-3xl p-4 rounded-2xl ${
//                   msg.type === "user"
//                     ? "bg-blue-600 text-white rounded-br-none"
//                     : "bg-gray-900/70 text-gray-200 border border-gray-700 rounded-bl-none"
//                 }`}
//               >
//                 {msg.type === "ai" && (
//                   <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-900 rotate-45 border-l border-t border-gray-700" />
//                 )}
//                 {msg.type === "user" && (
//                   <div className="absolute -right-2 top-0 w-4 h-4 bg-blue-600 rotate-45" />
//                 )}

//                 <div className="flex items-start gap-3">
//                   {msg.type === "ai" && (
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
//                       AI
//                     </div>
//                   )}
//                   <p className="whitespace-pre-wrap leading-relaxed text-sm">
//                     {msg.text}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-gray-900/70 border border-gray-700 rounded-2xl rounded-bl-none p-4 flex gap-3">
//               <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
//                 AI
//               </div>
//               <div className="flex gap-2 items-center">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
//               </div>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="flex justify-center">
//             <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input */}
//       <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur px-4 py-4">
//         <div className="max-w-4xl mx-auto relative">
//           <input
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleAskQuestion();
//               }
//             }}
//             placeholder="Ask something..."
//             className="w-full bg-gray-800 text-gray-200 rounded-xl py-4 pl-4 pr-16 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAskQuestion}
//             disabled={loading || !question.trim()}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl disabled:opacity-60"
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 />
//               </svg>
//             ) : (
//               "➤"
//             )}
//           </motion.button>

//           <p className="text-center text-xs text-gray-500 mt-2">
//             Press <span className="text-gray-300">Enter</span> to send
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatGemini;

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function ChatGemini() {
  const { user } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");

    setMessages((prev) => [...prev, { type: "user", text: question }]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/aiagent`,
        { question }
      );

      setMessages((prev) => [
        ...prev,
        { type: "ai", text: res.data.aiResponse },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const suggestedPrompts = [
    "How can I improve my LeetCode consistency?",
    "What weaknesses do you see in my coding profile?",
    "Is my GitHub strong enough for product companies?",
    "How can I improve my resume based on my projects?",
  ];

  return (
    <div className="py-10 h-screen flex flex-col bg-gradient-to-b from-black via-gray-950 to-black">

      {/* Header */}
      <div className="px-6 mb-4 text-center ">
        <h2 className="text-2xl font-bold text-white py-[20px]">
          {user?.name ? `Hi ${user.name} 👋` : "Career AI Assistant"}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Your personalized mentor powered by your coding data
        </p>

        {/* Connected Platforms */}
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          {user?.platforms?.leetcode && (
            <span className="text-xs bg-purple-600/20 border border-purple-500/40 px-3 py-1 rounded-full text-purple-300">
              LeetCode Connected
            </span>
          )}
          {user?.platforms?.github && (
            <span className="text-xs bg-blue-600/20 border border-blue-500/40 px-3 py-1 rounded-full text-blue-300">
              GitHub Synced
            </span>
          )}
          {user?.platforms?.codeforces && (
            <span className="text-xs bg-indigo-600/20 border border-indigo-500/40 px-3 py-1 rounded-full text-indigo-300">
              Codeforces Linked
            </span>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-3">
              Ask me anything about your coding journey
            </h3>
            <p className="text-gray-400 max-w-md mb-6">
              I analyze your LeetCode, GitHub, and resume data to give
              personalized guidance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedPrompts.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setQuestion(s)}
                  className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 hover:border-purple-500 hover:bg-gray-800 transition"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex md:px-[150px] ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-3xl p-4 rounded-2xl ${
                  msg.type === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-900/70 text-gray-200 border border-gray-800 rounded-bl-none"
                }`}
              >
                {msg.type === "ai" && (
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-900 rotate-45 border-l border-t border-gray-800" />
                )}
                {msg.type === "user" && (
                  <div className="absolute -right-2 top-0 w-4 h-4 bg-purple-600 rotate-45" />
                )}

                <div className="flex items-start gap-3">
                  {msg.type === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                      AI
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">
                    {msg.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl rounded-bl-none p-4 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                AI
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur px-4 py-4">
        <div className="max-w-4xl mx-auto relative">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            placeholder="Ask about your coding progress, resume, or interviews..."
            className="w-full bg-gray-800 text-gray-200 rounded-xl py-4 pl-4 pr-16 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAskQuestion}
            disabled={loading || !question.trim()}
            className="absolute right-2 mt-1 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl disabled:opacity-60"
          >
            {loading ? "..." : "➤"}
          </motion.button>

          <p className="text-center text-xs text-gray-500 mt-2">
            Press <span className="text-gray-300">Enter</span> to send
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatGemini;
