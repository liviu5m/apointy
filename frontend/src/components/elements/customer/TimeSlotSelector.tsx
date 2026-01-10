import { convertEnumToMins } from "@/lib/utils";
import { addMinutes, format } from "date-fns";

export function TimeSlotSelector({
  selectedTime,
  onSelect,
  duration,
}: {
  selectedTime: string;
  onSelect: (time: string) => void;
  duration: string;
}) {
  const minutes = convertEnumToMins(duration);
  let startTime = new Date();
  const endTime = new Date();
  const lunchStart = new Date();
  const lunchEnd = new Date();
  startTime.setHours(9, 0, 0, 0);
  endTime.setHours(17, 0, 0, 0);
  lunchStart.setHours(12, 0, 0, 0);
  lunchEnd.setHours(13, 0, 0, 0);

  let slots: string[] = [];

  while (startTime < endTime) {
    startTime = addMinutes(startTime, minutes);
    if (!(startTime > lunchStart && startTime < lunchEnd))
      slots.push(format(startTime, "HH:mm"));
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {slots.map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className={`py-2 cursor-pointer px-3 rounded-md text-sm font-medium border transition-all ${
            selectedTime === time
              ? "border-cyan-600 bg-cyan-600 text-white shadow-sm"
              : "border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
