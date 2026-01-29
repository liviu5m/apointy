import type { Appointment } from "@/lib/Types";
import { convertEnumToMins } from "@/lib/utils";
import {
  addMinutes,
  differenceInMinutes,
  format,
  isBefore,
  isToday,
  parse,
  parseISO,
} from "date-fns";

export function TimeSlotSelector({
  selectedTime,
  onSelect,
  duration,
  appointments,
  date,
}: {
  selectedTime: string;
  onSelect: (time: string) => void;
  duration: string;
  appointments: Appointment[];
  date: string;
}) {
  const BREAK_TIME = 10;
  const minutes = convertEnumToMins(duration);
  let startTime = new Date();
  const endTime = new Date();
  const lunchStart = new Date();
  const lunchEnd = new Date();
  startTime.setHours(9, 0, 0, 0);
  endTime.setHours(17, 0, 0, 0);
  lunchStart.setHours(12, 0, 0, 0);
  lunchEnd.setHours(13, 0, 0, 0);

  let slots: string[] = [format(startTime, "HH:mm")];

  while (1) {
    startTime = addMinutes(startTime, minutes + BREAK_TIME);
    if (startTime > endTime) break;
    if (!(startTime > lunchStart && startTime < lunchEnd))
      slots.push(format(startTime, "HH:mm"));
  }

  const isValidTimeSlot = (timeString: string) => {
    const slotDate = parse(
      `${date} ${timeString}`,
      "yyyy-MM-dd HH:mm",
      new Date(),
    );
    const now = new Date();

    return differenceInMinutes(slotDate, now) >= 60;
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {slots.map((time) => {
        const disabled = appointments.find(
          (appointment: Appointment) =>
            appointment.time.split(":").slice(0, -1).join(":") == time,
        );
        const valid = isValidTimeSlot(time);
        return (
          <button
            key={time}
            onClick={() => {
              if (!disabled) onSelect(time);
            }}
            className={`py-2 cursor-pointer px-3 rounded-md text-sm font-medium border transition-all ${
              disabled
                ? "bg-red-100 text-red-400 border-red-200 cursor-not-allowed"
                : !valid
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                  : selectedTime === time
                    ? "border-cyan-600 bg-cyan-600 text-white shadow-sm"
                    : "border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
