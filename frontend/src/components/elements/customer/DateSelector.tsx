import { format, addDays, startOfToday } from "date-fns";

export default function DateSelector({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const today = startOfToday();
  const dates = Array.from({
    length: 14,
  }).map((_, i) => addDays(today, i));
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
      {dates.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        const isSelected = selectedDate === dateStr;
        return (
          <button
            key={dateStr}
            onClick={() => onSelect(dateStr)}
            className={`p-3 cursor-pointer rounded-lg border text-center transition-all ${
              isSelected
                ? "border-cyan-600 bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600"
                : "border-slate-200 hover:border-cyan-300 hover:bg-slate-50"
            }`}
          >
            <div className="text-xs font-medium uppercase text-slate-500 mb-1">
              {format(date, "EEE")}
            </div>
            <div
              className={`text-lg font-bold ${
                isSelected ? "text-cyan-700" : "text-slate-900"
              }`}
            >
              {format(date, "d")}
            </div>
          </button>
        );
      })}
    </div>
  );
}
