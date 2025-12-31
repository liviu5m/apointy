import { Calendar } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0891B2] text-white flex items-center justify-center">
          <Calendar className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Apointy</h1>
      </div>
      <div className="p-10 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <h3 className="text-gray-400 mt-2 text-center">
          Sign in to manage your appointments
        </h3>
        <form className="mt-10 flex flex-col">
          <div>
            <h4 className="text-sm font-semibold mb-2">Email Address</h4>
            <input
              type="email"
              placeholder="you@example.com"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            />
          </div>
          <div className="mt-5 mb-3">
            <h4 className="text-sm font-semibold mb-2">Password</h4>
            <input
              type="password"
              placeholder="••••••••"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            />
          </div>
          <div>
            <h5 className="text-[#0891B2] font-semibold text-right text-sm cursor-pointer">
              Forgot Password ?
            </h5>
          </div>
          <button className="px-5 py-3 rounded-lg bg-[#0891B2] text-white font-semibold mt-7 cursor-pointer hover:bg-[#067996]">
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-5">
          Don't have an account?{" "}
          <Link to={"/auth/sign-up"} className="text-[#0891B2] font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
