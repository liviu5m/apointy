import type { Business } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getBusiness() {
  const response = await axios.get(`${baseUrl}/api/business`, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateBusinessFunc(data: Business) {
  const response = await axios.put(`${baseUrl}/api/business/${data.id}`, data, {
    withCredentials: true,
  });
  return response.data;
}
