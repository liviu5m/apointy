import type { Holiday } from "@/lib/Types";
import { format, addDays, parseISO, startOfWeek } from "date-fns";
import { useState } from "react";

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

  const startDate = startOfWeek(currentSelected, { weekStartsOn: 1 });

  const dates = Array.from({ length: 14 }).map((_, i) => addDays(startDate, i));

  return (
    <div className="grid grid-cols-7 gap-2">
      {dates.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        const isSelected = selectedDate === dateStr;
        const isNotValid = holidays.find(
          (holiday: Holiday) =>
            (format(date, "yyyy-MM-dd") == format(holiday.date, "yyyy-MM-dd") &&
              holiday.startTime == "00:00:00" &&
              holiday.endTime == "23:59:59") ||
            (holiday.type == "RECURRING_DAY" &&
              holiday.daysRecurring[parseInt(format(date, "i")) - 1] == "1" &&
              holiday.startTime == "00:00:00" &&
              holiday.endTime == "23:59:59"),
        );
        const [isHovered, setIsHovered] = useState(false);
        return (
          <button
            key={dateStr}
            type="button"
            onClick={() => {
              if (!isNotValid) onSelect(dateStr);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`p-3 relative rounded-lg border text-center transition-all ${
              isNotValid
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : isSelected
                  ? "border-cyan-600 cursor-pointer bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600"
                  : "border-slate-200 cursor-pointer hover:border-cyan-300 hover:bg-slate-50"
            }`}
          >
            {isNotValid && isHovered && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 pointer-events-none">
                <div className="bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 animate-in fade-in zoom-in duration-150">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Unavailable
                  </p>
                  <p className="leading-relaxed">{isNotValid.reason}</p>

                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-700" />
                </div>
              </div>
            )}
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
