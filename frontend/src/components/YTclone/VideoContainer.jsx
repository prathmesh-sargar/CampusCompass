import { useEffect } from "react";
import VideoCard from "./VideoCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideos } from "../../Features/Auth/storeSlices.js";

const VideoContainer = () => {
  const { video, category } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchVideosByCategory();
  }, [category]);

  // ⏱ Convert ISO 8601 duration → seconds
  const parseDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = parseInt(match?.[1] || 0, 10);
    const seconds = parseInt(match?.[2] || 0, 10);
    return minutes * 60 + seconds;
  };

  const fetchVideosByCategory = async () => {
    try {
      // 1️⃣ Search videos
      const searchRes = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            type: "video",
            maxResults: 25,
            q: category,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
          headers: { Authorization: null },
        }
      );

      const videoIds = searchRes.data.items
        .map((item) => item.id.videoId)
        .filter(Boolean)
        .join(",");

      if (!videoIds) return;

      // 2️⃣ Fetch video details (duration)
      const detailsRes = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,contentDetails",
            id: videoIds,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
          headers: { Authorization: null },
        }
      );

      // 3️⃣ Filter long videos (>= 60s)
      const longVideos = detailsRes.data.items.filter(
        (video) => parseDuration(video.contentDetails.duration) >= 100
      );

      dispatch(setHomeVideos(longVideos));
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="
      grid gap-6 p-4
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-4
    ">
      {video.map((item) => (
        <Link to={`/watch?v=${item.id}`} key={item.id}>
          <div className="
            bg-gray-900/70 backdrop-blur
             md:w-[300px]
            border border-gray-800
            rounded-xl
            overflow-hidden
            hover:border-gray-600
            transition
            duration-300
          ">
            <VideoCard item={item} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
