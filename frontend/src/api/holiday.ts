import type { BusinessHolidayData } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function createBusinessHoliday(
  data: BusinessHolidayData,
  serviceId: number,
) {
  const days = data.daysRecurring.map((el: boolean) => (el ? 1 : 0)).join("");

  const response = await axios.post(
    `${baseUrl}/api/business-holiday`,
    {
      ...data,
      daysRecurring: days,
      serviceId,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}
