import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setinput] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const _data = await getDocs(moviesRef);
      const dataArray = _data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredData = input
        ? dataArray.filter((item) => item.category === input)
        : dataArray;

      setData(filteredData);
      setLoading(false);
    }
    getData();
  }, [input]);

  return (
    <div className="min-h-screen py-[80px] px-4 bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] text-gray-200">
      
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Link to="/addactivities">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            + Add New
          </Button>
        </Link>

        <select
          className="w-full sm:w-[300px] bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Academics & Research">Academics & Research</option>
          <option value="Projects & Hackathons">Projects & Hackathons</option>
          <option value="Events & Fests">Events & Fests</option>
          <option value="Clubs & Communities">Clubs & Communities</option>
          <option value="Social Impact / Volunteering">
            Social Impact / Volunteering
          </option>
          <option value="Startups & Innovation">Startups & Innovation</option>
          <option value="Creativity & Design">Creativity & Design</option>
          <option value="Achievements & Awards">Achievements & Awards</option>
          <option value="Sports & Fitness">Sports & Fitness</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeDots height={40} color="#60a5fa" />
        </div>
      ) : (
        <div className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        ">
          {data.map((e) => (
            <Link to={`/detail/${e.id}`} key={e.id}>
              <div className="
                bg-gray-900/70 backdrop-blur
                border border-gray-700
                rounded-xl
                overflow-hidden
                hover:-translate-y-2
                hover:border-gray-500
                transition-all
                duration-300
                shadow-lg
              ">
                {/* Image */}
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />

                {/* Content */}
                <div className="p-3 space-y-2">
                  <h2 className="text-sm font-semibold text-gray-100 line-clamp-1">
                    {e.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">Rating</span>
                    <ReactStars
                      size={16}
                      half
                      value={e.rating / e.rated}
                      edit={false}
                    />
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-1">
                    <span className="text-gray-500">Author:</span>{" "}
                    {e.Author}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
