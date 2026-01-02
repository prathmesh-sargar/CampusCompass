import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";
import { Button } from "../ui/button";

const Details = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    Author: "",
    image: "",
    description: "",
    category: "",
    video: "",
    rating: 0,
    rated: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, [id]);

  return (
    <div className="min-h-screen pt-[100px] px-4 bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] text-gray-200">
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link to="/activities">
          <Button className="bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-200">
            ← Back
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeCircles height={30} color="#60a5fa" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Image */}
          <div className="w-full">
            <img
              src={data.image}
              alt={data.title}
              className="w-full max-h-[450px] object-cover rounded-2xl sticky top-24"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-100">
              {data.title}{" "}
              <span className="text-lg text-gray-400">
                ({data.category})
              </span>
            </h1>

            <ReactStars
              size={20}
              half
              value={data.rating / data.rated}
              edit={false}
            />

            <p className="text-gray-300 leading-relaxed">
              {data.description}
            </p>

            {/* Video */}
            {data.video && (
              <div className="mt-6">
                <video
                  controls
                  className="w-full max-h-[420px] rounded-xl border border-gray-700"
                  src={data.video}
                />
              </div>
            )}

            {/* Reviews */}
            <div className="mt-8">
              <Reviews
                id={id}
                prevRating={data?.rating}
                userRated={data?.rated}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;