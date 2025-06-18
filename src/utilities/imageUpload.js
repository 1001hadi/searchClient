import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append image file to form data
  formData.append("image", imageFile);

  try {
    const res = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        // Set header for file upload
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Return response data
    return res.data;
  } catch (err) {
    console.error("Error uploading the image:", err);
    // Rethrow error for handling
    throw err;
  }
};

export default uploadImage;
