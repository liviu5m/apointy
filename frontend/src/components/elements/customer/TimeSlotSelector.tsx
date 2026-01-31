import type { Appointment, Holiday, Service } from "@/lib/Types";
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
import { useState } from "react";

export function TimeSlotSelector({
  selectedTime,
  onSelect,
  duration,
  appointments,
  date,
  holidays,
  service,
}: {
  selectedTime: string;
  onSelect: (time: string) => void;
  duration: string;
  appointments: Appointment[];
  date: string;
  holidays: Holiday[];
  service: Service;
}) {
  const BREAK_TIME = 10;
  const minutes = convertEnumToMins(duration);
  let startTime = parse(service.startTime, "HH:mm:ss", new Date());
  const endTime = parse(service.endTime, "HH:mm:ss", new Date());

  let slots: string[] = [format(startTime, "HH:mm")];

  while (1) {
    startTime = addMinutes(startTime, minutes + BREAK_TIME);
    if (startTime > endTime) break;
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

  console.log(holidays, date);

  const specificDates = holidays.filter(
    (holiday: Holiday) => holiday.date == date,
  );
  const dailyBreaks = holidays.filter(
    (holiday: Holiday) => holiday.type == "DAILY_BREAK",
  );
  const recurringDays = holidays.filter(
    (holiday: Holiday) => holiday.type == "RECURRING_DAY",
  );

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {slots.map((time) => {
        const disabled = appointments.find(
          (appointment: Appointment) =>
            appointment.time.split(":").slice(0, -1).join(":") == time,
        );
        const valid = isValidTimeSlot(time);
        const isBreak =
          dailyBreaks.find(
            (holiday: Holiday) =>
              holiday.startTime <= time + ":00" &&
              holiday.endTime >= time + ":00",
          ) ||
          specificDates.find(
            (holiday: Holiday) =>
              holiday.startTime <= time + ":00" &&
              holiday.endTime >= time + ":00",
          ) ||
          recurringDays.find(
            (holiday: Holiday) =>
              holiday.startTime <= time + ":00" &&
              holiday.endTime >= time + ":00" &&
              holiday.daysRecurring[parseInt(format(date, "i")) - 1] == "1",
          );
        const [isHovered, setIsHovered] = useState(false);
        console.log(isBreak, isHovered);

        return (
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            key={time}
            onClick={() => {
              if (!disabled) onSelect(time);
            }}
            className={`py-2 relative cursor-pointer px-3 rounded-md text-sm font-medium border transition-all ${
              isBreak
                ? "bg-gray-200 text-gray-500"
                : disabled
                  ? "bg-red-100 text-red-400 border-red-200 cursor-not-allowed"
                  : !valid
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : selectedTime === time
                      ? "border-cyan-600 bg-cyan-600 text-white shadow-sm"
                      : "border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
            }`}
          >
            {isBreak && isHovered && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 pointer-events-none">
                <div className="bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 animate-in fade-in zoom-in duration-150">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Unavailable
                  </p>
                  <p className="leading-relaxed">{isBreak.reason}</p>

                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-700" />
                </div>
              </div>
            )}
            {time}
          </button>
        );
      })}
    </div>
  );
}
