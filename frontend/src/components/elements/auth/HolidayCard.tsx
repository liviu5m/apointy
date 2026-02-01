import { Clock, Calendar, Trash2, Tag, Edit } from "lucide-react";
import type { Holiday } from "@/lib/Types";

interface Props {
  holiday: Holiday;
  onDelete: (id: number) => void;
  setUpdateHoliday: (e: Holiday | null) => void;
}

const HolidayItem = ({ holiday, onDelete, setUpdateHoliday }: Props) => {
  const isFullDay =
    holiday.startTime === "00:00:00" && holiday.endTime === "23:59:59";

  const displayDate =
    typeof holiday.date === "object" && holiday.date !== null
      ? (holiday.date as Date).toLocaleDateString()
      : holiday.date;

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-md p-3 hover:border-slate-300 transition-all">
      <div className="flex justify-between items-start">
        <div className="max-w-[85%]">
          <h4 className="text-sm font-bold text-slate-800 truncate">
            {holiday.reason ||
              (holiday.type === "DAILY_BREAK"
                ? "Daily Break"
                : "Scheduled Holiday")}
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium uppercase tracking-tight">
            <Tag size={10} className="text-slate-400" />
            {holiday.service.name}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setUpdateHoliday(holiday)}
            className="text-slate-300 cursor-pointer hover:text-blue-500 transition-colors"
          >
            <Edit size={15} />
          </button>
          <button
            onClick={() => onDelete(holiday.id)}
            className="text-slate-300 cursor-pointer hover:text-red-500 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
        <div className="flex items-center gap-2">
          {holiday.type === "SPECIFIC_DATE" ? (
            <div className="flex items-center gap-1.5 text-[13px] text-slate-700">
              <Calendar size={14} className="text-blue-500" />
              <span className="font-semibold">{displayDate || "No date"}</span>
            </div>
          ) : (
            <div className="flex gap-1">
              {weekDays.map((day, i) => (
                <div
                  key={i}
                  className={`text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-[2px]
                    ${holiday.daysRecurring[i] == "1" ? "bg-amber-100 text-amber-700 border border-amber-200" : "text-slate-300 border border-transparent"}`}
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-right">
          {isFullDay ? (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">
              Whole Day
            </span>
          ) : (
            <div className="flex items-center gap-1 text-slate-700">
              <Clock size={13} className="text-slate-400" />
              <span className="text-[13px] font-mono font-bold">
                {holiday.startTime.slice(0, 5)}–{holiday.endTime.slice(0, 5)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 text-[9px] font-bold text-slate-400 flex justify-between uppercase tracking-widest">
        <span>ID: {holiday.id}</span>
        <span className="text-slate-300">{holiday.type.replace("_", " ")}</span>
      </div>
    </div>
  );
};

export default HolidayItem;
