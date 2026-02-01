import BodyLayout from "@/components/layouts/BodyLayout";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentServices from "../../elements/customer/AppointmentServices";
import type { AppointmentData } from "@/lib/Types";
import TimeAndDatePicker from "@/components/elements/customer/TimeAndDatePicker";
import ConfirmBooking from "@/components/elements/customer/ConfirmBooking";
import { format } from "date-fns";

const CustomerBookNow = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AppointmentData>({
    service: null,
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    notes: "",
  });
  const navigate = useNavigate();

  return (
    <BodyLayout>
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() =>
              step > 1 ? setStep((step - 1) as any) : navigate("/dashboard")
            }
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors cursor-pointer"
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
          {step === 1 && (
            <AppointmentServices
              setStep={setStep}
              data={data}
              setData={setData}
            />
          )}

          {step === 2 && data.service && (
            <TimeAndDatePicker
              setStep={setStep}
              data={data}
              setData={setData}
            />
          )}

          {step === 3 && data.service && (
            <ConfirmBooking data={data} setData={setData} />
          )}
        </div>
      </main>
    </BodyLayout>
  );
};

export default CustomerBookNow;
