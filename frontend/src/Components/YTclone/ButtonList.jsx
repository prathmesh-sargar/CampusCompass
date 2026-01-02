import { useState } from "react";
import { setcategory } from "../../Features/Auth/storeSlices";
import { useDispatch } from "react-redux";

const ButtonList = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const buttonlist = [
    "All",
    "JavaScript",
    "Java",
    "ReactJS",
    "Coder",
    "DSA",
    "Hacking",
    "MERN",
    "Internship",
  ];

  const videoByTag = (tag) => {
    if (active !== tag) {
      setActive(tag);
      dispatch(setcategory(tag));
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto py-3 px-1 scrollbar-hide">
      {buttonlist.map((name) => (
        <button
          key={name}
          onClick={() => videoByTag(name)}
          className={`
            whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition
            ${
              active === name
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }
          `}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
