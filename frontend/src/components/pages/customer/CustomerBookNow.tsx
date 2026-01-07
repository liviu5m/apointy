import BodyLayout from "@/components/layouts/BodyLayout";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentServices from "./AppointmentServices";

const CustomerBookNow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <BodyLayout>
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() =>
              step > 1 ? setStep((step - 1) as any) : navigate("/dashboard")
            }
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {step === 1 ? "Back to Dashboard" : "Back"}
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Book Appointment
          </h1>

          <div className="flex items-center mt-6 mb-8">
            <div
              className={`flex items-center ${
                step >= 1 ? "text-cyan-600" : "text-slate-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 ? "border-cyan-600 bg-cyan-50" : "border-slate-300"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Service</span>
            </div>
            <div
              className={`flex-1 h-0.5 mx-4 ${
                step >= 2 ? "bg-cyan-600" : "bg-slate-200"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                step >= 2 ? "text-cyan-600" : "text-slate-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 ? "border-cyan-600 bg-cyan-50" : "border-slate-300"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Date & Time</span>
            </div>
            <div
              className={`flex-1 h-0.5 mx-4 ${
                step >= 3 ? "bg-cyan-600" : "bg-slate-200"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                step >= 3 ? "text-cyan-600" : "text-slate-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 3 ? "border-cyan-600 bg-cyan-50" : "border-slate-300"
                }`}
              >
                3
              </div>
              <span className="ml-2 font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {step === 1 && <AppointmentServices />}

          {/* {step === 2 && selectedService && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Date
                </h3>
                <DateSelector
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />
              </div>

              {selectedDate && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-4">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Available Time Slots
                  </h3>
                  <TimeSlotSelector
                    selectedTime={selectedTime}
                    onSelect={setSelectedTime}
                    duration={selectedService.duration}
                  />
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  onClick={handleDateTimeSelect}
                  disabled={!selectedDate || !selectedTime}
                >
                  Continue
                </button>
              </div>
            </div>
          )} */}

          {/* {step === 3 && selectedService && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Confirm Booking</h2>

              <div className="bg-slate-50 rounded-lg p-6 mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Service</span>
                  <span className="font-semibold text-slate-900">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date</span>
                  <span className="font-semibold text-slate-900">
                    {selectedDate &&
                      format(parseISO(selectedDate), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time</span>
                  <span className="font-semibold text-slate-900">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">
                    {selectedService.duration} min
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-200">
                  <span className="text-lg font-medium text-slate-900">
                    Total Price
                  </span>
                  <span className="text-lg font-bold text-cyan-700">
                    ${selectedService.price}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Add Notes (Optional)
                </label>
                <textarea
                  className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  rows={3}
                  placeholder="Any special requests or details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleConfirm}
                isLoading={isSubmitting}
              >
                Confirm Booking
              </Button>
            </div>
          )} */}
        </div>
      </main>
    </BodyLayout>
  );
};

export default CustomerBookNow;
