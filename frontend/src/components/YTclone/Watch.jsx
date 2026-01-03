import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const YT_api = import.meta.env.VITE_YOUTUBE_API_KEY;

const Watch = () => {
  const [channelInfo, setChannelInfo] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "🎬 Watching a video? I’m here as your study buddy! I can summarize, explain, or share related info. Keep it short or ask for details — your call!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const videoID = searchParam.get("v");

  // Fetch video info
  const fetchDataByYoutubeID = async () => {
    if (!videoID) return;
    try {
      const res = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,contentDetails,statistics",
            id: videoID,
            key: YT_api,
          },
        }
      );
      setChannelInfo(res.data.items || []);
    } catch (error) {
      console.error("YouTube API Error:", error);
    }
  };

  useEffect(() => {
    fetchDataByYoutubeID();
  }, [videoID]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are a friendly YouTube study buddy chatbot.
- Keep answers short unless asked for detail.
- Be helpful, simple, and supportive.
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
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
     {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 z-50 bg-gray-900/80 backdrop-blur border border-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>
    <div className="bg-gray-950 text-gray-200 min-h-screen px-4 md:px-8 pt-20">
      
     

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        
        {/* Video Section */}
        <div className="flex-1 md:w-2/3">
          <iframe
            className="w-full aspect-video rounded-xl shadow-lg border border-gray-800"
            src={`https://www.youtube.com/embed/${videoID}`}
            title="YouTube video player"
            allowFullScreen
          />

          {channelInfo.map((item) => (
            <div
              key={item?.id}
              className="mt-6 p-5 bg-gray-900/70 backdrop-blur rounded-xl border border-gray-800"
            >
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {item?.snippet?.title}
              </h1>

              <div className="flex items-center mt-4">
                <img
                  src={item?.snippet.thumbnails.high.url}
                  alt="channel logo"
                  className="rounded-full h-12 w-12 border border-gray-700"
                />
                <div className="ml-4">
                  <p className="font-semibold">
                    {item?.snippet.channelTitle}
                  </p>
                  <p className="text-sm text-gray-400">
                    Subscribe • Like • Share
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Section */}
        <div className="md:w-1/3 w-full bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl flex flex-col h-[80vh]">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">
              AI Study Guide 📘
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-800 p-3 rounded-xl text-gray-400 text-sm italic">
                Typing…
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about this video…"
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
    </div>
    </>
  );
};

export default Watch;
