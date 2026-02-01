import { googleSyncAccount } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Store, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../elements/common/Loader";
import { useAppContext } from "@/lib/AppProvider";

const SocialCallback = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { setUser } = useAppContext();

  const { mutate: login } = useMutation({
    mutationKey: ["oauth2-user"],
    mutationFn: () =>
      googleSyncAccount(role, searchParams.get("access_token") || ""),
    onSuccess: (data) => {
      console.log(data);
      setUser(data);
      navigate("/");
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (
        err?.response?.data ==
        "You can log in only using credentials to this account"
      )
        navigate("/auth/login", {
          state: {
            error: "You can only log in to that account using credentials",
          },
        });
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    login();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-center h-screen w-screen flex-col">
      <div>
        <h2 className="text-center text-4xl font-bold">
          The Final Step of your login
        </h2>
        <h4 className="text-gray-600 text-xl text-center font-semibold my-5">
          I am ...
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`flex flex-col items-center justify-center p-10 rounded-lg border-2 transition-all cursor-pointer ${
            role === "customer"
              ? "border-cyan-600 bg-cyan-50 text-cyan-700"
              : "border-slate-200 hover:border-slate-300 text-slate-600"
          }`}
        >
          <User className="h-10 w-10 mb-2" />
          <span className="text-sm font-medium">Customer</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("business_owner")}
          className={`flex flex-col items-center justify-center p-10 rounded-lg border-2 transition-all cursor-pointer ${
            role === "business_owner"
              ? "border-cyan-600 bg-cyan-50 text-cyan-700"
              : "border-slate-200 hover:border-slate-300 text-slate-600"
          }`}
        >
          <Store className="h-10 w-10 mb-2" />
          <span className="text-sm font-medium">Business</span>
        </button>
      </div>
      <button
        className={`w-[400px] py-3 rounded-lg text-center font-semibold mt-10 cursor-pointer ${
          role
            ? "bg-[#0891B2] text-white hover:scale-105"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => {
          if (role) login();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default SocialCallback;
