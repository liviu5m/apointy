import { BarChart, Bell, Clock } from "lucide-react";

const SectionBuilt = () => {
  return (
    <div className="bg-white py-20 flex items-center justify-center w-full">
      <div className="container">
        <h1 className="text-center text-3xl font-bold">
          Built for Local Service Businesses
        </h1>
        <p className="text-gray-600 text-center mt-5 text-lg">
          Running a business is hard enough without the chaos of manual
          scheduling.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <Bell className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Double Bookings
            </h3>
            <p className="text-slate-600">
              Eliminate the embarrassment of two customers showing up at the
              same time because of a manual error.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Uncertain Wait Times
            </h3>
            <p className="text-slate-600">
              Stop customers from waiting in your lobby without knowing their
              position in the queue.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <BarChart className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              No Visibility
            </h3>
            <p className="text-slate-600">
              Gain insights into your daily capacity and busiest hours instead
              of guessing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBuilt;
