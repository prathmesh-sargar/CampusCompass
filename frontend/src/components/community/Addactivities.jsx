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
              title: "Image uploaded successfully",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setImg("");
          })
          .catch(() => {
            swal({
              title: "Image upload failed",
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
              title: "Video uploaded successfully",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setVideo("");
          })
          .catch(() => {
            swal({
              title: "Video upload failed",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          });
      });
    }
  };

  function formValidation() {
    if (
      form.Author &&
      form.title &&
      form.description &&
      form.image &&
      form.video
    ) {
      addMovie();
      setTimeout(() => {
        navigate("/");
      }, 4500);
    } else {
      swal({
        title: "Fill all the fields 😉",
        icon: "info",
        buttons: false,
        timer: 3000,
      });
    }
  }

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
    <div className="min-h-screen pt-[90px] px-4 bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] text-gray-200">
      {/* Back */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link to="/activities">
          <Button className="bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-200">
            ← Back
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
          Add Activity
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-400">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-sm font-medium text-gray-400">
              Your Name
            </label>
            <input
              value={form.Author}
              onChange={(e) => setForm({ ...form, Author: e.target.value })}
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-400">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Academics & Research">Academics & Research</option>
              <option value="Projects & Hackathons">
                Projects & Hackathons
              </option>
              <option value="Events & Fests">Events & Fests</option>
              <option value="Clubs & Communities">Clubs & Communities</option>
              <option value="Social Impact / Volunteering">
                Social Impact / Volunteering
              </option>
              <option value="Startups & Innovation">
                Startups & Innovation
              </option>
              <option value="Creativity & Design">Creativity & Design</option>
              <option value="Achievements & Awards">
                Achievements & Awards
              </option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="bg-gray-800/60 border border-dashed border-gray-600 rounded-xl p-4">
            <label className="text-sm font-medium text-gray-400 block mb-2">
              Upload Image
            </label>

            <div className="flex items-center justify-between gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="px-4 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 text-sm text-center">
                  {img ? "📸 Image selected" : "Click to select image"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleClick}
                disabled={!img}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          img
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-700 cursor-not-allowed"
        }`}
              >
                {loadingImg ? <TailSpin height={18} color="white" /> : "Upload"}
              </button>
            </div>

            {form.image && (
              <p className="mt-2 text-xs text-green-400">✅ Image uploaded</p>
            )}
          </div>

          {/* Video Upload */}
          <div className="bg-gray-800/60 border border-dashed border-gray-600 rounded-xl p-4">
            <label className="text-sm font-medium text-gray-400 block mb-2">
              Upload Video
            </label>

            <div className="flex items-center justify-between gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="px-4 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 text-sm text-center">
                  {video ? "🎥 Video selected" : "Click to select video"}
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleClickvideo}
                disabled={!video}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          video
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-700 cursor-not-allowed"
        }`}
              >
                {loadingVideo ? (
                  <TailSpin height={18} color="white" />
                ) : (
                  "Upload"
                )}
              </button>
            </div>

            {form.video && (
              <p className="mt-2 text-xs text-green-400">✅ Video uploaded</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-400">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full mt-1 h-32 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              onClick={formValidation}
              className="px-8 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold"
            >
              {loading ? <TailSpin height={22} color="white" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addactivities;
