import type { Holiday } from "@/lib/Types";
import { format, addDays, parseISO, startOfWeek } from "date-fns";

export default function DateSelector({
  selectedDate,
  onSelect,
  holidays,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
  holidays: Holiday[];
}) {
  const currentSelected = parseISO(selectedDate);

  const startDate = startOfWeek(currentSelected, { weekStartsOn: 0 });

  const dates = Array.from({ length: 14 }).map((_, i) => addDays(startDate, i));
  console.log(holidays);

  return (
    <div className="grid grid-cols-7 gap-2">
      {dates.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        const isSelected = selectedDate === dateStr;
        const isValid = holidays.find(
          (holiday: Holiday) =>
            format(date, "yyyy-MM-dd") == format(holiday.date, "yyyy-MM-dd") &&
            holiday.startTime == "00:00:00" &&
            holiday.endTime == "23:59:59",
        );
        return (
          <button
            key={dateStr}
            type="button"
            onClick={() => onSelect(dateStr)}
            className={`p-3  rounded-lg border text-center transition-all ${
              isValid
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : isSelected
                  ? "border-cyan-600 cursor-pointer bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600"
                  : "border-slate-200 cursor-pointer hover:border-cyan-300 hover:bg-slate-50"
            }`}
          >
            <div className="text-[10px] font-medium uppercase text-slate-500 mb-1">
              {format(date, "EEE")}
            </div>
            <div
              className={`text-lg font-bold ${isSelected ? "text-cyan-700" : "text-slate-900"}`}
            >
              {format(date, "d")}
            </div>
          </button>
        );
      })}
    </div>
  );
}
