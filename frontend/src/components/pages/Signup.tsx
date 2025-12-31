import { Calendar, Store, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("");

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0891B2] text-white flex items-center justify-center">
          <Calendar className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Apointy</h1>
      </div>
      <div className="p-10 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold text-center">Create an account</h1>
        <h3 className="text-gray-400 mt-2 text-center">
          Get started with Apointy today
        </h3>
        <form className="mt-10 flex flex-col gap-5">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  role === "customer"
                    ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <User className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("business_owner")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  role === "business_owner"
                    ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <Store className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Business</span>
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Full Name</h4>
            <input
              type="text"
              placeholder="John Doe"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Email Address</h4>
            <input
              type="email"
              placeholder="you@example.com"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Password</h4>
            <input
              type="password"
              placeholder="••••••••"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">
              Password Confirmation
            </h4>
            <input
              type="password"
              placeholder="••••••••"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            />
          </div>
          <button className="px-5 py-3 rounded-lg bg-[#0891B2] text-white font-semibold mt-7 cursor-pointer hover:bg-[#067996]">
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-[#0891B2] font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
