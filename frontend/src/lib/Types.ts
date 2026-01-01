export type SignupData = {
  role: string;
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  fullName: string;
  role: string;
};

export type PasswordState = {
  step: string;
  email: string;
};

export type PasswordResetData = {
  password: string;
  passwordConfirmation: string;
}