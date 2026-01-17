import React from "react";
import { Calendar, Clock, User, Check, X, AlertCircle } from "lucide-react";
import { addMinutes, format, parse, parseISO } from "date-fns";
import type { Appointment } from "@/lib/Types";
import { useAppContext } from "@/lib/AppProvider";
import { Badge } from "./Badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointmentFunc } from "@/api/appointment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const queryClient = useQueryClient();
  const { user } = useAppContext();
  const role = user?.role.toLowerCase();

  const statusColors = {
    pending: "warning",
    confirmed: "success",
    cancelled: "danger",
    completed: "default",
  } as const;
  const formattedDate = format(
    parseISO(appointment.date),
    "EEEE, MMMM d, yyyy",
  );

  const dateReference = parse(appointment.time, "HH:mm:ss", new Date());
  const startTime = format(dateReference, "HH:mm");
  const endTime = format(addMinutes(dateReference, 30), "HH:mm");

  const handleUpdate = (status: string) => {
    Swal.fire({
      title: "Are you sure you want to proceed this ?",
      text: "This action can not be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes !",
    }).then((result) => {
      if (result.isConfirmed) {
        updateAppointment(status);
      }
    });
  };

  const { mutate: updateAppointment } = useMutation({
    mutationKey: ["cancel-appointment", appointment.id],
    mutationFn: (status: string) => updateAppointmentFunc(appointment, status),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["get-user-appointments"] });
    },
    onError: (err) => {
      console.log(err);
      toast("Something went wrong.");
    },
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-slate-900">
              {appointment.service.name}
            </h3>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              {role === "business_owner" ? (
                <>
                  <User className="h-3.5 w-3.5 mr-1.5" />
                  <span>{appointment.userDto.fullName}</span>
                </>
              ) : (
                <span className="text-slate-500">
                  Service ID: {appointment.service.id}
                </span>
              )}
            </div>
          </div>
          <Badge
            variant={
              statusColors[
                appointment.status.toLowerCase() as keyof typeof statusColors
              ]
            }
          >
            {appointment.status.toLowerCase().charAt(0).toUpperCase() +
              appointment.status.toLowerCase().slice(1)}
          </Badge>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-center text-slate-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-slate-600 text-sm">
            <Clock className="h-4 w-4 mr-2 text-slate-400" />
            <span>
              {startTime} - {endTime}
            </span>
          </div>
          {appointment.notes && (
            <div className="flex items-start text-slate-600 text-sm mt-2 bg-slate-50 p-2 rounded">
              <AlertCircle className="h-4 w-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="italic">"{appointment.notes}"</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
          {role === "business_owner" &&
            appointment.status.toLowerCase() === "pending" && (
              <button
                className="text-white bg-emerald-600 hover:bg-emerald-700  px-4 py-2 flex items-center gap-3 rounded-lg cursor-pointer"
                onClick={() => handleUpdate("confirmed")}
              >
                <Check className="h-4 w-4 mr-1.5" />
                Confirm
              </button>
            )}

          {role === "business_owner" &&
            appointment.status.toLowerCase() === "confirmed" && (
              <button
                className="hover:bg-green-50 px-4 py-2 flex items-center gap-3 rounded-lg cursor-pointer"
                onClick={() => handleUpdate("completed")}
              >
                <Check className="h-4 w-4 mr-1.5" />
                Complete
              </button>
            )}

          {(appointment.status.toLowerCase() == "pending" ||
            appointment.status.toLowerCase() == "confirmed") && (
            <button
              onClick={() => handleUpdate("cancelled")}
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 flex items-center gap-3 rounded-lg cursor-pointer"
            >
              <X className="h-4 w-4 mr-1.5" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
