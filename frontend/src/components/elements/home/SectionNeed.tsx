import {
  BarChart,
  Bell,
  Calendar,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import React from "react";

const SectionNeed = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="container">
        <h1 className="text-center text-3xl font-bold">
          Everything You Need to Manage Appointments
        </h1>
        <p className="text-gray-600 text-center mt-5 text-lg">
          Powerful features wrapped in a simple interface that anyone can use.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Online Booking
            </h3>
            <p className="text-slate-600">
              Let customers book appointments 24/7 from any device, even when
              you are closed.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Live Queue
            </h3>
            <p className="text-slate-600">
              Real-time position updates for walk-ins so they can wait where
              they want.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
              <Bell className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Smart Reminders
            </h3>
            <p className="text-slate-600">
              Automated email and SMS reminders to drastically reduce no-shows.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Calendar Sync
            </h3>
            <p className="text-slate-600">
              Seamlessly integrates with Google Calendar to keep your schedule
              unified.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
              <BarChart className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Analytics</h3>
            <p className="text-slate-600">
              Understand your peak hours, most popular services, and revenue
              trends.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Multi-user Access
            </h3>
            <p className="text-slate-600">
              Separate views and permissions for business owners, staff, and
              customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionNeed;
