import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllServiceCategories() {
  const response = await axios.get(`${baseUrl}/api/service-category`, {
    withCredentials: true,
  });
  return response.data;
}
