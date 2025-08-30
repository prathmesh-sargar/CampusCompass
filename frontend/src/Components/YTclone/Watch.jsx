import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// import { API_KEY } from "./contstant/YouTube"; // keep your key in .env instead

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // ✅ move to .env
const YT_api = import.meta.env.VITE_YOUTUBE_API_KEY;

const Watch = () => {
  const [channelInfo, setChannelInfo] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hey! I’m your study buddy for this video. Ask me questions — I’ll keep answers short unless you want detail.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [searchParam] = useSearchParams();
  const videoID = searchParam.get("v");

  // ✅ Fetch video info
  const fetchDataByYoutubeID = async () => {
    if (!videoID) return;
    try {
      const res = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,contentDetails,statistics",
            id: videoID,
            key: import.meta.env.VITE_YOUTUBE_API_KEY, // ✅ use from constants or .env
          },
        }
      );
      setChannelInfo(res.data.items || []);
    } catch (error) {
      console.error("Error fetching video info:", error.response?.data || error.message);
    }
  };

  // Run when videoID changes
  useEffect(() => {
    fetchDataByYoutubeID();
  }, [videoID]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ✅ Handle send
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const yt_link = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key${YT_api}`

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `  here is channel info ${channelInfo} analysize this and give me info related to that  you analyzie this and genenrate summery or give me information about it in detail as well ok  You are a friendly study guide helping with YouTube video content.
- Keep answers short (2–3 lines max) unless user asks for detail.
- If question starts with "explain", "why", "how", or "in detail", then expand more.
- Be clear, supportive, and helpful.

User question: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Sorry, I couldn't get a response.";

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // console.log("channel info : "+channelInfo);
  

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col md:flex-row px-4 md:px-8 pt-20 gap-6">
      {/* Left: Video Section */}
      <div className="flex-1 w-full md:w-2/3">
        <div className="relative">
          <iframe
            className="w-full aspect-video rounded-xl shadow-lg"
            src={`https://www.youtube.com/embed/${videoID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {channelInfo.map((item) => (
          <div
            key={item?.id}
            className="mt-6 p-5 bg-gray-900 rounded-xl shadow-lg"
          >
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {item?.snippet?.title}
            </h1>
            <div className="flex items-center mt-4">
              <img
                src={item?.snippet.thumbnails.high.url}
                alt="channel logo"
                className="rounded-full h-12 w-12 object-cover border border-gray-700"
              />
              <div className="ml-4">
                <p className="font-semibold">{item?.snippet.channelTitle}</p>
                <p className="text-sm text-gray-400">
                  Subscribe • Like • Share
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Chat Section */}
      <div className="w-full md:w-1/3 bg-gray-900 rounded-xl shadow-lg flex flex-col h-[80vh]">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Study Guide 📘</h2>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-600 self-end text-white"
                  : "bg-gray-800 self-start text-gray-300"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="bg-gray-800 p-3 rounded-lg self-start text-gray-400 text-sm italic">
              Typing...
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-gray-800 flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this video..."
            rows={1}
            className="flex-1 resize-none bg-gray-800 text-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Watch;
