import type {
  LoginData,
  PasswordResetData,
  PasswordState,
  SignupData,
} from "@/lib/Types";
import axios from "axios";
import { Axis3D } from "lucide-react";

const baseUrl = import.meta.env.VITE_API_URL;

export async function signupUser(data: SignupData) {
  const response = await axios.post(`${baseUrl}/auth/signup`, data);
  return response.data;
}

export async function checkVerificationCode(
  verificationCode: string,
  userId: number
) {
  const response = await axios.post(`${baseUrl}/auth/verify`, {
    verificationCode,
    userId,
  });
  return response.data;
}

export async function resendVerificationCode(userId: number) {
  const response = await axios.post(`${baseUrl}/auth/resend`, {
    userId,
  });
  return response.data;
}

export async function authenticateUser(data: LoginData) {
  const response = await axios.post(`${baseUrl}/auth/login`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function getUser() {
  const response = await axios.get(`${baseUrl}/auth/jwt`, {
    withCredentials: true,
  });
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(
    `${baseUrl}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function sendResetUserPasswordEmail(email: string) {
  const response = await axios.post(`${baseUrl}/auth/password-email`, {
    email,
  });
  return response.data;
}

export async function checkPasswordVerificationCodeFunc(
  email: string,
  code: string
) {
  const response = await axios.put(`${baseUrl}/auth/password-code`, {
    email,
    code,
  });
  return response.data;
}

export async function resendPasswordVerificationCodeFunc(email: string) {
  const response = await axios.put(`${baseUrl}/auth/password-code-resend`, {
    email,
  });
  return response.data;
}

export async function resetPasswordFunc(
  data: PasswordResetData,
  email: string
) {
  const response = await axios.put(`${baseUrl}/auth/password-reset`, {
    ...data,
    email,
  });
  return response.data;
}

export async function googleSyncAccount(role: string, token: string) {
  console.log(token);

  const response = await axios.post(
    `${baseUrl}/auth/google-sync`,
    {
      role,
      token,
    },
    { withCredentials: true }
  );
  return response.data;
}
