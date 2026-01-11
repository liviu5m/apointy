import type { Appointment, AppointmentData } from "@/lib/Types";
import axios from "axios";
import { format } from "date-fns";
import { Beaker } from "lucide-react";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createAppointmentFunc(data: AppointmentData) {
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

export async function getAppointmentByUserId() {
  const response = await axios.get(`${baseUrl}/api/appointment`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getAppointmentByOwnerId(status: string) {
  const response = await axios.get(`${baseUrl}/api/appointment/service`, {
    params: {
      status,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function updateAppointmentFunc(
  appointment: Appointment,
  status: string
) {
  const response = await axios.put(
    `${baseUrl}/api/appointment/${appointment.id}`,
    {
      ...appointment,
      status,
    },
    { withCredentials: true }
  );
  return response.data;
}

export async function checkAvailabilityAppointment(
  serviceId: number,
  date: string
) {
  if (!date) return [];
  const formattedDate = format(date, "yyyy-MM-dd");
  const response = await axios.get(`${baseUrl}/api/appointment/available`, {
    params: {
      serviceId,
      date: formattedDate,
    },
    withCredentials: true,
  });
  return response.data;
}
