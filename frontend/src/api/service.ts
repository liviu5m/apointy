import type { ServiceData } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createServiceFunc(data: ServiceData) {
  const response = await axios.post(`${baseUrl}/api/service`, data, {
    withCredentials: true,
  });
  return response.data;
}