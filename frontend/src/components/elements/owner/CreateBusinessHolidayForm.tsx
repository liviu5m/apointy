import { createBusinessHoliday } from "@/api/holiday";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import type { BusinessHolidayData } from "@/lib/Types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  CalendarSync,
  ChevronDownIcon,
  UtensilsCrossed,
} from "lucide-react";
import React, { useState } from "react";

const CreateBusinessHolidayForm = ({ serviceId }: { serviceId: number }) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<BusinessHolidayData>({
    type: "",
    reason: "",
    startTime: "10:30:00",
    endTime: "10:30:00",
    date: undefined,
    daysRecurring: [false, false, false, false, false, false, false],
  });

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const { mutate: createHoliday } = useMutation({
    mutationKey: ["create-holiday", serviceId],
    mutationFn: () => createBusinessHoliday(data, serviceId),
  });

  return (
    <div>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          createHoliday();
        }}
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">
            Reason
          </label>
          <input
            type="text"
            placeholder="eg. Christmas"
            className="px-4 py-2 rounded-lg border-gray-200 border w-full outline-[#0891B2] text-sm"
            value={data.reason}
            onChange={(e) => setData({ ...data, reason: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Type</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              type="button"
              onClick={() => setData({ ...data, type: "SPECIFIC_DATE" })}
              className={`flex flex-col items-center cursor-pointer justify-center p-4 rounded-lg border-2 transition-all ${
                data.type === "SPECIFIC_DATE"
                  ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <CalendarIcon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Specific Date</span>
            </button>
            <button
              type="button"
              onClick={() => setData({ ...data, type: "DAILY_BREAK" })}
              className={`flex flex-col items-center cursor-pointer justify-center p-4 rounded-lg border-2 transition-all ${
                data.type === "DAILY_BREAK"
                  ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <UtensilsCrossed className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Daily Break</span>
            </button>
            <button
              type="button"
              onClick={() => setData({ ...data, type: "RECURRING_DAY" })}
              className={`flex flex-col items-center cursor-pointer justify-center p-4 rounded-lg border-2 transition-all ${
                data.type === "RECURRING_DAY"
                  ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <CalendarSync className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Recurring Day</span>
            </button>
          </div>
        </div>
        {data.type && (
          <>
            {data.type == "SPECIFIC_DATE" && (
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-700 mb-2">
                  Date
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker-optional"
                      className="w-full justify-between font-normal"
                    >
                      {data.date ? format(data.date, "PPP") : "Select date"}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={data.date}
                      captionLayout="dropdown"
                      defaultMonth={data.date}
                      onSelect={(date) => {
                        setData({ ...data, date: date });
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            {data.type == "RECURRING_DAY" && (
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Days
                </label>
                <div className="flex items-center justify-between gap-4 mt-2">
                  {days.map((day: string, i: number) => {
                    return (
                      <div
                        className={`w-14 h-14 rounded-lg shadow cursor-pointer flex items-center justify-center  ${data.daysRecurring[i] ? "bg-[#0891B2] text-white" : "hover:bg-[#0891B2] hover:text-white bg-gray-100"}`}
                        onClick={() => {
                          let daysRec = data.daysRecurring;
                          daysRec[i] = !daysRec[i];
                          setData({ ...data, daysRecurring: daysRec });
                        }}
                      >
                        <h4>{day}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="flex items-center gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-700 mb-2">
                  Start Time
                </label>
                <Input
                  type="time"
                  id="time-picker-optional"
                  step="1"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  value={data.startTime}
                  onChange={(e) =>
                    setData({ ...data, startTime: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-700 mb-2">
                  End Time
                </label>
                <Input
                  type="time"
                  id="time-picker-optional"
                  step="1"
                  defaultValue="11:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  value={data.endTime}
                  onChange={(e) =>
                    setData({ ...data, endTime: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              className="w-full px-5 py-3 shadow text-white bg-[#0891B2] font-semibold rounded-lg cursor-pointer hover:bg-[#077c99] active:scale-95"
              type="submit"
            >
              Create
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateBusinessHolidayForm;
