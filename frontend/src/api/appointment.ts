import type { AppointmentData } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createAppointmentFunc(data: AppointmentData) {
  console.log(data);
  const response = await axios.post(
    `${baseUrl}/api/appointment`,
    {
      ...data,
      serviceId: data.service?.id,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
}
