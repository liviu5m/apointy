import { createAppointmentFunc } from "@/api/appointment";
import type { AppointmentData } from "@/lib/Types";
import { convertEnumServiceDuration } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import type { Axios, AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmBooking = ({
  setData,
  data,
}: {
  setData: (e: AppointmentData) => void;
  data: AppointmentData;
}) => {
  const navigate = useNavigate();
  const { mutate: createAppointment } = useMutation({
    mutationKey: ["create-appointment"],
    mutationFn: () => createAppointmentFunc(data),
    onSuccess: (data) => {
      console.log(data);
      navigate("/customer/appointments");
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast(err.response?.data as string);
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Confirm Booking</h2>

      <div className="bg-slate-50 rounded-lg p-6 mb-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-600">Service</span>
          <span className="font-semibold text-slate-900">
            {data.service?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Date</span>
          <span className="font-semibold text-slate-900">
            {data.date && format(parseISO(data.date), "EEEE, MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Time</span>
          <span className="font-semibold text-slate-900">{data.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Duration</span>
          <span className="font-semibold text-slate-900">
            {convertEnumServiceDuration(data.service?.duration || "")}
          </span>
        </div>
        <div className="flex justify-between pt-4 border-t border-slate-200">
          <span className="text-lg font-medium text-slate-900">
            Total Price
          </span>
          <span className="text-lg font-bold text-cyan-700">
            ${data.service?.price}
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
          value={data.notes}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
        />
      </div>

      <button
        onClick={() => createAppointment()}
        disabled={!data.date || !data.time}
        className="px-5 py-3 bg-cyan-600 rounded-lg w-fit text-white font-semibold cursor-pointer hover:bg-cyan-700 w-full"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default ConfirmBooking;
