import {
  checkPasswordVerificationCodeFunc,
  resendPasswordVerificationCodeFunc,
} from "@/api/user";
import type { PasswordState } from "@/lib/Types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

const PasswordResetCode = ({ email }: { email: string }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { mutate: checkPasswordVerificationCode } = useMutation({
    mutationKey: ["send-reset-password-email"],
    mutationFn: () => checkPasswordVerificationCodeFunc(email, code),
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/password-reset/", {
        state: { fromPasswordReset: true, page: "reset", email },
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      setError(err.response?.data as string);
    },
  });

  const { mutate: resend } = useMutation({
    mutationKey: ["resend-password-verification-code"],
    mutationFn: () => resendPasswordVerificationCodeFunc(email),
    onSuccess: (data) => {
      console.log(data);
      toast("Code resent successfully");
      setError("");
      setCode("");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Enter the code</h1>
      <h3 className="text-gray-400 mt-2 text-center">
        You have received a verification code on{" "}
        <span className="text-[#0891B2]">@{email}</span>
      </h3>
      <form
        className="mt-10 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          checkPasswordVerificationCode();
        }}
      >
        <div>
          <div className="flex items-center justify-center">
            <InputOTP maxLength={6} value={code} onChange={(e) => setCode(e)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <button className="px-5 py-3 rounded-lg bg-[#0891B2] text-white font-semibold mt-7 cursor-pointer hover:bg-[#067996]">
          Verify
        </button>
        <div>
          <h2 className="text-red-500 text-center mt-5">
            {error}{" "}
            {error == "Password verification code has expired" && (
              <button
                className="font-bold ml-3 cursor-pointer"
                onClick={() => {
                  resend();
                }}
              >
                Resend
              </button>
            )}
          </h2>
        </div>
      </form>
    </>
  );
};

export default PasswordResetCode;
