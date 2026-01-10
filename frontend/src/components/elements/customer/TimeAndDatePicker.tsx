import React from "react";
import DateSelector from "./DateSelector";
import type { AppointmentData } from "@/lib/Types";
import { TimeSlotSelector } from "./TimeSlotSelector";

const TimeAndDatePicker = ({
  setStep,
  setData,
  data,
}: {
  setStep: (e: number) => void;
  setData: (e: AppointmentData) => void;
  data: AppointmentData;
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Date</h3>
        <DateSelector
          selectedDate={data.date}
          onSelect={(date) => {
            setData({ ...data, date });
          }}
        />
      </div>

      {data.date && (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Available Time Slots
          </h3>
          <TimeSlotSelector
            selectedTime={data.time}
            onSelect={(time) => setData({ ...data, time })}
            duration={data.service?.duration || ""}
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
