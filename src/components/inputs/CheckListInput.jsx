import React, { useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

const CheckListInput = ({ checklist, setCheckList }) => {
  const [option, setOption] = useState("");

  // handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setCheckList([...checklist, option.trim()]);
      setOption("");
    }
  };

  // handle deleting an option
  const handleDeleteOption = (index) => {
    const updatedArr = checklist.filter((_, idx) => idx !== index);
    setCheckList(updatedArr);
  };
  return (
    <div>
      {checklist.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

          <button
            className="cursor-pointer"
            onClick={() => {
              handleDeleteOption(index);
            }}
          >
            <FaTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter task checklist..."
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />

        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <BsBookmarkPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default CheckListInput;
