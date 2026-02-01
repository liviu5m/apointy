import { updateAppointmentFunc } from "@/api/appointment";
import type { Appointment } from "@/lib/Types";
import { convertEnumToMins } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMinutes, format, parse, parseISO } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  User,
  X,
} from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function QueueAppointmentCard({
  appointment,
  currentAppointment,
  setCurrentAppointment,
  index,
}: {
  appointment: Appointment;
  currentAppointment: number;
  setCurrentAppointment: Dispatch<SetStateAction<number>>;
  index: number;
}) {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["get-appointments-queue"] });
      setCurrentAppointment(currentAppointment + 1);
    },
    onError: (err) => {
      console.log(err);
      toast("Something went wrong.");
    },
  });
  const formattedDate = format(
    parseISO(appointment.date),
    "EEEE, MMMM d, yyyy",
  );

  const dateReference = parse(appointment.time, "HH:mm:ss", new Date());
  const startTime = format(dateReference, "HH:mm");
  const endTime = format(
    addMinutes(dateReference, convertEnumToMins(appointment.service.duration)),
    "HH:mm",
  );

  const isThisCurrentAppointment =
    index == currentAppointment && appointment.status != "CANCELLED";
  const isPast = index < currentAppointment;
  const isPendingStatus = appointment.status === "PENDING";
  console.log(appointment);

  return (
    <div
      className={`transition-all duration-300 border-l-4 ${
        isThisCurrentAppointment
          ? isPendingStatus
            ? "bg-yellow-50 border-yellow-500 shadow-md scale-[1.02]"
            : "bg-emerald-50 border-emerald-500 shadow-md scale-[1.02]"
          : isPast
            ? "bg-gray-50 border-gray-300 opacity-60"
            : "bg-white border-transparent hover:border-gray-200"
      } rounded-r-xl border-b border-gray-100 overflow-hidden`}
    >
      <div className="p-5 flex items-center justify-between">
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <h3 className="font-semibold text-lg text-slate-900">
              {appointment.service.name}
              {isPendingStatus && !isPast && (
                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase ml-3">
                  Pending Approval
                </span>
              )}
            </h3>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <User className="h-3.5 w-3.5 mr-1.5" />
              <span>{appointment.userDto.fullName}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
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
              <div className="flex items-start text-slate-600 text-sm mt-2 bg-slate-50 p-2 rounded max-w-md">
                <AlertCircle className="h-4 w-4 mr-2 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="italic">"{appointment.notes}"</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 ml-4">
          {appointment.status == "CANCELLED" ? (
            <span className="text-red-400 text-sm italic font-medium">
              Cancelled
            </span>
          ) : appointment.status == "NO_SHOW" ? (
            <span className="text-gray-400 text-sm italic font-medium">
              Didn't showed up
            </span>
          ) : appointment.status == "COMPLETED" ? (
            <span className="text-green-400 text-sm italic font-medium">
              Completed
            </span>
          ) : isThisCurrentAppointment ? (
            isPendingStatus ? (
              <div className="flex items-center gap-3">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 flex items-center gap-2 rounded-xl font-bold shadow-lg shadow-yellow-200 transition-all active:scale-95 cursor-pointer"
                  onClick={() => handleUpdate("confirmed")}
                >
                  Approve
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleUpdate("cancelled")}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-xl font-bold shadow-lg shadow-gray-200 transition-all active:scale-95 cursor-pointer"
                  onClick={() => handleUpdate("no_show")}
                >
                  Didn't showed up
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95 cursor-pointer"
                  onClick={() => handleUpdate("completed")}
                >
                  Next in Line
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )
          ) : (
            !isPast && (
              <button
                onClick={() => handleUpdate("cancelled")}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )
          )}
        </div>
      </div>

      {appointment.notes && !isPast && (
        <div className="px-5 pb-4">
          <div className="flex items-start text-slate-500 text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
            <AlertCircle className="h-3.5 w-3.5 mr-2 text-slate-400 mt-0.5" />
            <p>Notes: {appointment.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QueueAppointmentCard;
