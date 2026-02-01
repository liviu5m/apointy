import { authenticateUser } from "@/api/user";
import { useAppContext } from "@/lib/AppProvider";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser } = useAppContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const { mutate: authenticate } = useMutation({
    mutationKey: ["authenticate-user"],
    mutationFn: () => authenticateUser(data),
    onSuccess: (data) => {
      console.log(data);
      setUser(data);
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        if (typeof error.response?.data == "string") {
          toast.error(error.response?.data as string);
        } else {
          Object.entries(error.response.data).forEach(([field, message]) => {
            if (field == "userId")
              navigate("/auth/verify/", {
                state: { fromSignup: true, userId: message },
              });
          });
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      setTimeout(() => {
        setError("");
      }, 5000);
      navigate(location.pathname, { replace: true });
    }
  }, []);

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
        {error && (
          <p className="text-center text-red-500 text-sm mt-5">{error}</p>
        )}
        <form
          className="mt-10 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            authenticate();
          }}
        >
          <div>
            <h4 className="text-sm font-semibold mb-2">Email Address</h4>
            <input
              type="email"
              placeholder="you@example.com"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mt-5 mb-3">
            <h4 className="text-sm font-semibold mb-2">Password</h4>
            <input
              type="password"
              placeholder="••••••••"
              className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div>
            <h5
              className="text-[#0891B2] font-semibold text-right text-sm cursor-pointer float-right"
              onClick={() => {
                navigate("/auth/password-reset", {
                  state: { fromPasswordReset: true, page: "email" },
                });
              }}
            >
              Forgot Password ?
            </h5>
          </div>
          <button className="px-5 py-3 rounded-lg bg-[#0891B2] text-white font-semibold mt-7 cursor-pointer hover:bg-[#067996]">
            Sign in
          </button>
        </form>
        <div className="relative my-5">
          <div className="h-px w-full bg-gray-400"></div>
          <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-white p-2 text-sm">
            Or
          </span>
        </div>
        <button
          className="flex items-center justify-center gap-5 w-full border border-gray-200 bg-white text-[#0891B2] font-semibold px-5 py-3 rounded-lg cursor-pointer hover:bg-[#0891B2] hover:text-white"
          onClick={() => handleGoogleLogin()}
        >
          <img src="/imgs/google.png" className="w-7" />
          <h2>Google</h2>
        </button>
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
