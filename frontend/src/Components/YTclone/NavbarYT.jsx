import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setcategory } from "../../Features/Auth/storeSlices";

const NavbarYT = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const searchbtn = () => {
    if (!input.trim()) return;
    dispatch(setcategory(input));
    setInput("");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full max-w-2xl gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchbtn()}
          type="text"
          placeholder="Search videos..."
          className="
            flex-1 px-4 py-2 rounded-xl
            bg-gray-800 border border-gray-700
            text-gray-200 placeholder-gray-400
            outline-none focus:ring-2 focus:ring-blue-500
          "
        />
        <button
          onClick={searchbtn}
          className="
            px-4 rounded-xl
            bg-blue-600 hover:bg-blue-700
            flex items-center justify-center
            transition
          "
        >
          <IoSearchSharp size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default NavbarYT;
