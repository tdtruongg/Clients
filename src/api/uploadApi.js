import axios from "axios";

export const uploadApi = {
  uploadImage: async (file) => {
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_APP_CLOUDINARY_PRESET
    );

    // Upload directly to Cloudinary
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_APP_CLOUDINARY_NAME
      }/image/upload`,
      formData
    );

    return data.secure_url;
  },
};

export default uploadApi;
