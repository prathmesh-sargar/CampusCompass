import  { useEffect } from "react";
import VideoCard from "./VideoCard.jsx";
import axios from "axios";
// import { YouTube_Videos } from "./contstant/YouTube.js";
import { Link } from "react-router-dom";
// import { API_KEY } from "./contstant/YouTube.js";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideos } from "../../Features/Auth/storeSlices.js";

const VideoContainer = () => {
  const { video, category } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  // const fetchYouTubeVideos = async () => {
  //   try {
  //     const res = await axios.get(`${YouTube_Videos}`);
  //     console.log("YT fetch : "+res);
      
  //     dispatch(setHomeVideos(res?.data?.items));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


    useEffect(() => {
    fetchVideosByCategory();
  }, [category]);

  const fetchVideosByCategory = async () => {
    try {
      const res = await axios.get(
  `https://youtube.googleapis.com/youtube/v3/search`, {
    params: {
      part: "snippet",
      maxResults: 20,
      q: category,
      key: import.meta.env.VITE_YOUTUBE_API_KEY,  // ✅ keep in .env
    },
    headers: {
        Authorization: null,   // 👈 force remove Authorization header
      }
  }
);
       console.log("YT Data: ", res?.data?.items);
      dispatch(setHomeVideos(res?.data?.items));
      
      
    } catch (error) {
       console.log("Error fetching videos:", error.response?.data || error.message);
    }
  };

// const fetchVideosByCategory = async () => {
//   try {
//     // Step 1: Search videos
//     const searchRes = await axios.get("https://youtube.googleapis.com/youtube/v3/search", {
//       params: {
//         part: "snippet",
//         type: "video",
//         maxResults: 20,
//         q: category,
//         key: import.meta.env.VITE_YOUTUBE_API_KEY,
//       },
//       headers: { Authorization: null },
//     });

//     const videoIds = searchRes.data.items.map(item => item.id.videoId).join(",");

//     // Step 2: Get video details
//     const detailsRes = await axios.get("https://youtube.googleapis.com/youtube/v3/videos", {
//       params: {
//         part: "contentDetails,snippet",
//         id: videoIds,
//         key: import.meta.env.VITE_YOUTUBE_API_KEY,
//       },
//       headers: { Authorization: null },
//     });

//     // Step 3: Filter shorts (< 60s)
//     function parseDuration(duration) {
//       const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
//       const minutes = parseInt(match?.[1] || 0, 10);
//       const seconds = parseInt(match?.[2] || 0, 10);
//       return minutes * 60 + seconds;
//     }

//     const longVideos = detailsRes.data.items.filter(
//       (video) => parseDuration(video.contentDetails.duration) >= 60
//     );

//     console.log("Filtered Videos:", longVideos);
//     dispatch(setHomeVideos(longVideos));
//   } catch (error) {
//     console.error("Error fetching videos:", error.response?.data || error.message);
//   }
// };

  const getVideoId = (item) => {
    if (item.id?.videoId) {
      return item.id.videoId;
    } else {
      return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {video.map((item) => {
        const videoId = getVideoId(item);

        // Skip rendering if there's no videoId
        if (!videoId) return null;

        return (
          <Link to={`/watch?v=${videoId}`} key={videoId}>
            <div className=" text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform overflow-hidden">
              <VideoCard item={item} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
