import { getQueuePosition } from "@/api/service";
import type { Appointment } from "@/lib/Types";
import { convertEnumToMins } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { addMinutes, format, isToday, parse, parseISO } from "date-fns";
import { Calendar, Clock } from "lucide-react";

const DashboardAppointmentCard = ({ apt }: { apt: Appointment }) => {
  const dateReference = parse(apt.time, "HH:mm:ss", new Date());
  const startTime = format(dateReference, "HH:mm");
  const endTime = format(
    addMinutes(dateReference, convertEnumToMins(apt.service.duration)),
    "HH:mm",
  );
  const today = isToday(parseISO(apt.date));

  const { data: queue } = useQuery({
    queryKey: ["queue-position", apt.id],
    queryFn: () => getQueuePosition(apt.id),
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });

  return (
    <div key={apt.id} className="p-6 hover:bg-slate-50 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div>
            <h3 className="font-medium text-slate-900">{apt.service.name}</h3>
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
          {today && (
            <div>
              {queue == 1 ? (
                <p className="font-medium text-sm text-green-700">You're next in line</p>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-700">
                    {queue - 1} people{queue == 2 ? "" : "s"} ahead of you
                  </p>
                  <p className="text-xs text-slate-500">
                    Your Position: #{queue}
                  </p>
                </>
              )}
            </div>
          )}
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
};

export default DashboardAppointmentCard;
