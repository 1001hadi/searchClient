import { useRef, useState } from "react";
import { LuUser, LuTrash } from "react-icons/lu";
import { RiVideoUploadLine } from "react-icons/ri";

const AddProfileImg = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewPath, setPreviewPath] = useState(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    // uploading profile image
    if (file) {
      setImage(file);
      // get preview url from the file
      const preview = URL.createObjectURL(file);
      setPreviewPath(preview);
    }
  };

  const handleRemoveImg = () => {
    setImage(null);
    setPreviewPath(null);
  };

  const handleChooseImg = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImgChange}
        className="hidden"
      />
      {image ? (
        <div className="relative">
          {/* Assuming previewPath is derived from 'image' */}
          <img
            src={previewPath}
            alt="profile-image"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImg}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white absolute -bottom-1 rounded-full -right-1"
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-green-600 text-white absolute -bottom-1 -right-1 rounded-full cursor-pointer"
            onClick={handleChooseImg}
          >
            <RiVideoUploadLine />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProfileImg;
