import { resetPasswordFunc } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordResetForm = ({ email }: { email: string }) => {
  const [data, setData] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();

  const { mutate: resetPassword } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: () => resetPasswordFunc(data, email),
    onSuccess: (data) => {
      console.log(data);
      toast("Password Reset Successfully");
      navigate("/auth/login");
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast(err?.response?.data as string);
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Reset Your Password</h1>
      <h3 className="text-gray-400 mt-2 text-center">
        Complete the form in order to reset your password
      </h3>
      <form
        className="mt-10 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword();
        }}
      >
        <div>
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
          <h4 className="text-sm font-semibold mb-2">Password Confirmation</h4>
          <input
            type="password"
            placeholder="••••••••"
            className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            value={data.passwordConfirmation}
            onChange={(e) =>
              setData({ ...data, passwordConfirmation: e.target.value })
            }
          />
        </div>
        <button className="px-5 py-3 rounded-lg bg-[#0891B2] text-white font-semibold mt-7 cursor-pointer hover:bg-[#067996]">
          Verify
        </button>
      </form>
    </>
  );
};

export default PasswordResetForm;
