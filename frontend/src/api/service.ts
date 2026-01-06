import type { ServiceData } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createServiceFunc(data: ServiceData) {
  const response = await axios.post(`${baseUrl}/api/service`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAllServices() {
  const response = await axios.get(`${baseUrl}/api/service`, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateService(data: ServiceData, serviceId: number) {
  const response = await axios.put(
    `${baseUrl}/api/service/${serviceId}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function deleteService(serviceId: number) {
  const response = await axios.delete(`${baseUrl}/api/service/${serviceId}`, {
    withCredentials: true,
  });
  return response.data;
}
