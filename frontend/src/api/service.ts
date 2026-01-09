import type { ServiceData } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

type FilterData = {
  name: string;
  duration: string;
  categoryId: string;
  prices: number[];
};

export async function createServiceFunc(data: ServiceData) {
  const response = await axios.post(`${baseUrl}/api/service`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAllServicesByUserId() {
  const response = await axios.get(`${baseUrl}/api/service/user-id`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAllServices(
  data: FilterData,
  page: number,
  pageSize: number
) {
  const response = await axios.get(`${baseUrl}/api/service`, {
    params: {
      name: data.name || null,
      duration:
        data.duration !== "all" && data.duration !== "" ? data.duration : null,
      categoryId:
        data.categoryId !== "all" && data.categoryId !== ""
          ? data.categoryId
          : null,
      minPrice: data.prices[0],
      maxPrice: data.prices[1],
      page: page - 1,
      size: pageSize,
    },
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

export async function getPriceRange() {
  const response = await axios.get(`${baseUrl}/api/service/price`, {
    withCredentials: true,
  });
  return response.data;
}
