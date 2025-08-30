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
      console.log(_data);

      // Convert _data to an array
      const dataArray = _data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Filter data based on category
      const filteredData = input
        ? dataArray.filter((item) => item.category === input)
        : dataArray;
      setData(filteredData);
      setLoading(false);
    }
    getData();
  }, [input]);
  return (
    <>
      <div className="w-full mt-[100px]">
       <div className="flex justify-end p-1">
         <Link to={"/addactivities"}>
          <h1 className="text-lg cursor-pointer flex items-center">
            <Button>
              + <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
       </div>
        <select
          className="w-1/3 md:w-[300px]  bg- px-5 rounded-lg py-1 bg-slate-200 text-black"
          value={input.category}
          onChange={(e) => setinput(e.target.value)}
        >
          <option value="">Select Category</option>
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
      <div className="grid grid-cols-2 md:grid-cols-4 px-3 mt-2">
        {loading ? (
          <div className="ml-[80px] md:ml-[450px] w-full flex justify-center items-center h-96">
            <ThreeDots height={40} color="white" />
          </div>
        ) : (
          data.map((e) => {
            return (
              <Link to={`/detail/${e.id}`} key={Math.random()}>
                <div
                  key={Math.random()}
                  className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500 flex first-letter:"
                >
                  <div>
                    <img
                      className="w-[144px] h-60 md:h-72 md:w-[260px] rounded-lg"
                      src={e.image}
                      alt="img"
                    />
                    <h1>{e.title}</h1>
                    <h1 className="flex items-center">
                      <span className="text-gray-300 mr-1">Rating:</span>
                      <ReactStars
                        size={20}
                        half={true}
                        value={e.rating / e.rated}
                        edit={false}
                      />
                    </h1>
                    <h1>
                      <span className="text-gray-300">Author:</span> {e.Author}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};
export default Cards;
