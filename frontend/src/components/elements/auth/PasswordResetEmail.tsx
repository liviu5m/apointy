import { sendResetUserPasswordEmail } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordResetEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { mutate: sendResetPasswordEmail } = useMutation({
    mutationKey: ["send-reset-password-email"],
    mutationFn: () => sendResetUserPasswordEmail(email),
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/password-reset/", {
        state: { fromPasswordReset: true, page: "code", email },
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast(err?.response?.data as string);
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Reset your password</h1>
      <h3 className="text-gray-400 mt-2 text-center">
        Enter the email of which you want to reset the password
      </h3>
      <form
        className="mt-10 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          sendResetPasswordEmail();
        }}
      >
        <div>
          <h4 className="text-sm font-semibold mb-2">Email Address</h4>
          <input
            type="email"
            placeholder="you@example.com"
            className="px-5 py-3 rounded-lg border-gray-200 border w-[400px] outline-[#0891B2] text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="px-5 py-3 rounded-lg bg-[#0891B2] text-white font-semibold mt-7 cursor-pointer hover:bg-[#067996]">
          Send Email
        </button>
      </form>
    </>
  );
};

export default PasswordResetEmail;
