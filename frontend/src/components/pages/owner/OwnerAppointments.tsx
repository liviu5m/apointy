import { getAppointmentByOwnerId } from "@/api/appointment";
import BodyLayout from "@/components/layouts/BodyLayout";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/elements/common/Loader";
import type { Appointment } from "@/lib/Types";
import { AppointmentCard } from "@/components/elements/common/AppointmentCard";

const OwnerAppointments = () => {
  const [status, setStatus] = useState("all");
  const { data: appointments, isPending } = useQuery({
    queryKey: ["get-appointments", status],
    queryFn: () => getAppointmentByOwnerId(status),
    placeholderData: keepPreviousData,
  });

  return isPending ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex items-center justify-center">
        <div className="container mt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Appointments</h1>
            <Select value={status} onValueChange={(e) => setStatus(e)}>
              <SelectTrigger className="py-5 text-sm">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-gray-600 font-semibold my-2">
            Manage your schedule and booking requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
            {appointments.map((appointment: Appointment, i: number) => {
              return <AppointmentCard key={i} appointment={appointment} />;
            })}
          </div>
        </div>
      </div>
    </BodyLayout>
  );
};

export default OwnerAppointments;
