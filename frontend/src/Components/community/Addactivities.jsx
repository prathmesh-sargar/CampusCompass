import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../../firebase/firebase";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { imageDb } from "../../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button } from "../ui/button";

const Addactivities = () => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    Author: "",
    category: "",
    description: "",
    image: "",
    video: "",
    rated: 0,
    rating: 0,
  });

  // Upload Image
  const handleClick = () => {
    if (img !== "") {
      setLoadingImg(true);
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref)
          .then((url) => {
            setForm({ ...form, image: url });
            setLoadingImg(false);
            swal({
              title: "successfully uploaded image ",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setImg("");
          })
          .catch(() => {
            swal({
              title: " Image not Uploaded try again ..",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          });
      });
    }
  };

  // Upload Video
  const handleClickvideo = () => {
    if (video !== "") {
      setLoadingVideo(true);
      const videoRef = ref(imageDb, `videos/${v4()}`);
      uploadBytes(videoRef, video).then((value) => {
        getDownloadURL(value.ref)
          .then((url) => {
            setForm({ ...form, video: url });
            setLoadingVideo(false);
            swal({
              title: "successfully uploaded video ",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setVideo("");
          })
          .catch(() => {
            swal({
              title: " video not Uploaded try again ..",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          });
      });
    }
  };

  // Validation
  function formValidation() {
    if (
      form.Author !== "" &&
      form.title !== "" &&
      form.description !== "" &&
      form.image !== "" &&
      form.video !== ""
    ) {
      addMovie();
      setTimeout(() => {
        navigate("/");
      }, 4500);
    } else {
      swal({
        title: "Fill all the data ok 😉📲 ",
        icon: "info",
        buttons: false,
        timer: 3000,
      });
    }
  }

  // Add Doc
  const addMovie = async () => {
    setLoading(true);
    try {
      await addDoc(moviesRef, form);
      swal({
        title: "Successfully Added",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setForm({
        title: "",
        Author: "",
        description: "",
        image: "",
        video: "",
        category: "",
      });
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative mt-[90px] p-2">
         <Button ><Link to={"/activities"}>back</Link></Button>
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-black flex justify-between px-3 ">
              <span className="md:hidden block">Add Activities...</span>
              
            </h1>
            <div className="text-3xl text-back hidden md:block font-bold">
               Add Activity 
            </div>
          </div>


          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm  text-black font-semibold"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    required
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full bg-white rounded border border-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm  text-black font-semibold"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="Author"
                    value={form.Author}
                    required
                    onChange={(e) =>
                      setForm({ ...form, Author: e.target.value })
                    }
                    className="w-full bg-white rounded border border-black focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="w-full mt-3">
                <select
                  className="w-full px-5 rounded-lg py-1 bg-blue-300 text-black"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Academics & Research">
                    Academics & Research
                  </option>
                  <option value="Projects & Hackathons">
                    Projects & Hackathons
                  </option>
                  <option value="Events & Fests">Events & Fests</option>
                  <option value="Clubs & Communities">
                    Clubs & Communities
                  </option>
                  <option value="Social Impact / Volunteering">
                    Social Impact / Volunteering
                  </option>
                  <option value="Startups & Innovation">
                    Startups & Innovation
                  </option>
                  <option value="Creativity & Design">
                    Creativity & Design
                  </option>
                  <option value="Achievements & Awards">
                    Achievements & Awards
                  </option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="leading-7 text-sm text-black font-semibold"
                  >
                    Upload Image
                  </label>
                  <div>
                    <input
                      className="px-[50px] bg-white"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </div>
                  <button
                    className="bg-blue-300 px-4 py-1 text-black rounded-lg mt-2"
                    onClick={handleClick}
                  >
                    {loadingImg ? (
                      <TailSpin height={25} color="black" />
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="video"
                    className="leading-7 text-sm  text-black font-semibold"
                  >
                    Upload Video
                  </label>
                  <div>
                    <input
                      className="px-[50px] bg-white"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </div>
                  <button
                    className="bg-blue-300 px-4 py-1 text-black rounded-lg mt-2"
                    onClick={handleClickvideo}
                  >
                    {loadingVideo ? (
                      <TailSpin height={25} color="black" />
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm  text-black font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full rounded border border-black focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  onClick={formValidation}
                  className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addactivities;
