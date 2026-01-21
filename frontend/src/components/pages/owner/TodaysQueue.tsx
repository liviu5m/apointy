import { getAppointmentByOwnerId } from "@/api/appointment";
import { Badge } from "@/components/elements/common/Badge";
import Loader from "@/components/elements/common/Loader";
import QueueAppointmentCard from "@/components/elements/owner/QueueAppointmentCard";
import BodyLayout from "@/components/layouts/BodyLayout";
import type { Appointment } from "@/lib/Types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const TodaysQueue = () => {
  const { data: appointments, isPending } = useQuery({
    queryKey: ["get-appointments-queue"],
    queryFn: () => getAppointmentByOwnerId("all"),
  });
  const [currentAppointment, setCurrentAppointment] = useState(0);

  const todaysAppointments = isPending
    ? []
    : appointments.filter(
        (appointment: Appointment) =>
          appointment.date == format(new Date(), "yyyy-MM-dd"),
      );

  useEffect(() => {
    if (!todaysAppointments) return;

    const firstConfirmedIndex = todaysAppointments.findIndex(
      (app: Appointment) =>
        app.status != "CANCELLED" && app.status != "COMPLETED",
    );

    if (firstConfirmedIndex !== -1) {
      setCurrentAppointment(firstConfirmedIndex);
    } else setCurrentAppointment(todaysAppointments.length);
  }, [todaysAppointments]);

  return isPending ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex items-center justify-center">
        <div className="container my-10">
          <h1 className="font-bold text-4xl">Today's Queue</h1>
          <h5 className="mt-2 text-gray-600">Manage today's appointment.</h5>
          <div className="bg-white rounded-xl shadow px-8 py-5 mt-10 flex flex-col gap-5">
            {todaysAppointments.map((appointment: Appointment, i: number) => {
              return (
                <QueueAppointmentCard
                  key={appointment.id}
                  index={i}
                  appointment={appointment}
                  currentAppointment={currentAppointment}
                  setCurrentAppointment={setCurrentAppointment}
                />
              );
            })}
          </div>
          {currentAppointment == todaysAppointments.length && (
            <p className="text-center text-semibold mt-10">
              For a moment you've got no other appointments, make sure to check
              for new ones
            </p>
          )}
        </div>
      </div>
    </BodyLayout>
  );
};

export default TodaysQueue;
