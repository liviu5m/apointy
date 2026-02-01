import { useState } from "react";
import DateSelector from "./DateSelector";
import type { AppointmentData } from "@/lib/Types";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { checkAvailabilityAppointment } from "@/api/appointment";
import Loader from "../common/Loader";
import { getBusinessHolidays } from "@/api/holiday";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const TimeAndDatePicker = ({
  setStep,
  setData,
  data,
}: {
  setStep: (e: number) => void;
  setData: (e: AppointmentData) => void;
  data: AppointmentData;
}) => {
  const [open, setOpen] = useState(false);
  const { data: appointments, isPending } = useQuery({
    queryKey: ["check-availability-appointments", data.date],
    queryFn: () =>
      checkAvailabilityAppointment(data.service?.id || -1, data.date),
    placeholderData: keepPreviousData,
  });

  const { data: holidays, isPending: isHolidayPending } = useQuery({
    queryKey: ["get-holidays", data.service?.id],
    queryFn: () => getBusinessHolidays(data.service?.id || -1),
  });

  return isPending || isHolidayPending ? (
    <Loader />
  ) : (
    <div className={`p-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-fit justify-between font-normal"
            >
              {data.date ? format(data.date, "PPP") : "Select date"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={parseISO(data.date)}
              captionLayout="dropdown"
              onSelect={(date) => {
                setData({
                  ...data,
                  date: format(date || "", "yyyy-MM-dd"),
                });
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Date</h3>
        <DateSelector
          selectedDate={data.date}
          onSelect={(date) => {
            setData({ ...data, date });
          }}
          holidays={holidays}
        />
      </div>

      {data.date && data.service && (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Available Time Slots
          </h3>
          <TimeSlotSelector
            appointments={appointments}
            selectedTime={data.time}
            onSelect={(time) => setData({ ...data, time })}
            duration={data.service?.duration || ""}
            date={data.date}
            holidays={holidays}
            service={data.service}
          />
        </div>
      )}

      <div className="flex justify-end border-t border-slate-100">
        <button
          onClick={() => setStep(3)}
          disabled={!data.date || !data.time}
          className="px-5 py-3 bg-cyan-600 rounded-lg w-fit float-right text-white mt-5 font-semibold cursor-pointer hover:bg-cyan-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TimeAndDatePicker;
