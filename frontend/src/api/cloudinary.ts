import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function uploadImage(image: File) {
  const response = await axios.post(
    `${baseUrl}/api/cloudinary`,
    {
      file: image,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}
