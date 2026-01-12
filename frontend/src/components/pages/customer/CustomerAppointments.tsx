import { getAppointmentByUserId } from "@/api/appointment";
import { AppointmentCard } from "@/components/elements/common/AppointmentCard";
import Loader from "@/components/elements/common/Loader";
import BodyLayout from "@/components/layouts/BodyLayout";
import type { Appointment } from "@/lib/Types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CustomerAppointments = () => {
  const { data: appointments, isPending } = useQuery({
    queryKey: ["get-user-appointments"],
    queryFn: () => getAppointmentByUserId(),
  });

  const upcomingAppointment = isPending
    ? []
    : appointments.filter(
        (appointment: Appointment) =>
          appointment.status == "PENDING" || appointment.status == "CONFIRMED"
      );

  const pastAppointments = isPending
    ? []
    : appointments.filter(
        (appointment: Appointment) =>
          appointment.status == "CANCELLED" || appointment.status == "COMPLETED"
      );

  return isPending ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex items-center justify-center mt-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">My Appointments</h1>
            <Link to={"/customer/book-now"} className="px-5 py-3 rounded-lg bg-cyan-600 text-white font-semibold flex items-center gap-3">
              <Plus />
              <span>Book New</span>
            </Link>
          </div>
          <div>
            <h4 className="my-5 text-lg font-semibold">Upcoming</h4>
            {upcomingAppointment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAppointment.map(
                  (appointment: Appointment, i: number) => {
                    return (
                      <AppointmentCard key={i} appointment={appointment} />
                    );
                  }
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <p className="text-slate-500 mb-6">No upcoming appointments.</p>
                <Link
                  to="/customer/book-now"
                  className="px-5 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700"
                >
                  Book your first appointment
                </Link>
              </div>
            )}
          </div>
          {pastAppointments && pastAppointments.length > 0 && (
            <div className="mb-20 mt-10">
              <h4 className="my-5 text-lg font-semibold">Past & Canceled</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastAppointments.map((appointment: Appointment, i: number) => {
                  return <AppointmentCard key={i} appointment={appointment} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </BodyLayout>
  );
};

export default CustomerAppointments;
