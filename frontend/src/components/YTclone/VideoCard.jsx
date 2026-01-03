import axios from "axios";
import { useEffect, useState } from "react";

const VideoCard = ({ item }) => {
  const [ytIcon, setYtIcon] = useState("");
  const [channelTitle, setChannelTitle] = useState("");

  const getChannelDetail = async () => {
    try {
      if (!item?.snippet?.channelId) return;

      const res = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/channels",
        {
          params: {
            part: "snippet",
            id: item.snippet.channelId,
            key: import.meta.env.VITE_YOUTUBE_API_KEY, // ✅ moved to env
          },
          headers: { Authorization: null },
        }
      );

      const channel = res?.data?.items?.[0];
      if (!channel) return;

      setChannelTitle(channel.snippet.title);
      setYtIcon(channel.snippet.thumbnails.high.url);
    } catch (error) {
      console.error("Channel fetch error:", error);
    }
  };

  useEffect(() => {
    getChannelDetail();
  }, [item?.snippet?.channelId]);

  return (
    <div className="w-full bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl overflow-hidden transition hover:border-gray-600">
      
      {/* Thumbnail */}
      <img
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.title}
        className="w-full aspect-video object-cover"
      />

      {/* Content */}
      <div className="p-3 space-y-3">
        
        {/* Channel */}
        <div className="flex items-center gap-3">
          <img
            src={ytIcon}
            alt={channelTitle}
            className="h-8 w-8 rounded-full object-cover border border-gray-700"
          />
          <p className="text-sm text-gray-300 line-clamp-1">
            {channelTitle}
          </p>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-100 leading-snug line-clamp-2">
          {item.snippet.title}
        </h3>
      </div>
    </div>
  );
};

export default VideoCard;
