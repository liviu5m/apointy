import { getAppointmentByOwnerId } from "@/api/appointment";
import { getAllServicesByUserId } from "@/api/service";
import Loader from "@/components/elements/common/Loader";
import BodyLayout from "@/components/layouts/BodyLayout";
import { useAppContext } from "@/lib/AppProvider";
import type { Appointment } from "@/lib/Types";
import { convertEnumToMins, getUserRole } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { addMinutes, format, parse } from "date-fns";
import { ArrowRight, Calendar, Clock, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  const { user } = useAppContext();
  const { data: appointments, isPending } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: () => getAppointmentByOwnerId("all"),
  });

  const { data: services, isPending: isPendingServices } = useQuery({
    queryKey: ["owner-services"],
    queryFn: () => getAllServicesByUserId(),
  });

  const upcomingAppointment = isPending
    ? []
    : appointments.filter(
        (appointment: Appointment) =>
          appointment.status == "PENDING" || appointment.status == "CONFIRMED",
      );
  return isPending || isPendingServices ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex items-center justify-center">
        <div className="container py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-4xl">Dashboard</h1>
              <h5 className="mt-2 text-gray-600">
                Welcome back,{" "}
                <span className="text-[#0891B2] font-semibold">
                  {user?.fullName}
                </span>
              </h5>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Link
                to={"/owner/services"}
                className="px-5 py-3 rounded-lg flex items-center justify-center bg-white gap-3 font-semibold cursor-pointer border border-gray-200"
              >
                <Settings className="w-5" /> <span>Manage Services</span>
              </Link>
              <Link
                to={"/owner/appointments"}
                className="px-5 py-3 rounded-lg text-white flex items-center justify-center bg-[#0891B2] gap-3 font-semibold cursor-pointer hover:bg-[#087f9c]"
              >
                <Calendar className="w-5" /> <span>View Schedule</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {"Today's Appointments"}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {
                      appointments.filter((apt: Appointment) => {
                        const isToday =
                          format(new Date(apt.date), "yyyy-MM-dd") ===
                          format(new Date(), "yyyy-MM-dd");
                        return isToday;
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending Requests
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {
                      appointments.filter(
                        (apt: Appointment) =>
                          apt.status.toLowerCase() == "pending",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Service
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {services.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">
                {"Upcoming Schedule"}
              </h2>
              <Link
                to={`/${getUserRole(user)}/appointments`}
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {upcomingAppointment.length > 0 ? (
                upcomingAppointment.slice(0, 5).map((apt: Appointment) => {
                  const dateReference = parse(apt.time, "HH:mm:ss", new Date());
                  const startTime = format(dateReference, "HH:mm");
                  const endTime = format(
                    addMinutes(
                      dateReference,
                      convertEnumToMins(apt.service.duration),
                    ),
                    "HH:mm",
                  );
                  return (
                    <div
                      key={apt.id}
                      className="p-6 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-slate-900">
                            {apt.service.name}
                          </h3>
                          <div className="flex items-center text-sm text-slate-500 mt-1 gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {format(new Date(apt.date), "MMM d, yyyy")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {startTime} - {endTime}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${
                        apt.status.toLowerCase() === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                        >
                          {apt.status}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                  <p className="text-slate-500 mb-6">
                    No upcoming appointments.
                  </p>
                  <Link
                    to="/customer/book-now"
                    className="px-5 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700"
                  >
                    Book your first appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BodyLayout>
  );
};

export default OwnerDashboard;
