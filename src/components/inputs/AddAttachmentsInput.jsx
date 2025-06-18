import React, { useState } from "react";
import { FaFileCode } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // handle adding option
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // handle deleting option
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <FaFileCode className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>

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
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3">
          <FaFileCode className="text-gray-400" />

          <input
            type="text"
            placeholder="Add attachment link here..."
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white py-2"
          />
        </div>

        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <BsBookmarkPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
