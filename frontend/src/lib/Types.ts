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
  createdAt: string;
};

export type PasswordState = {
  step: string;
  email: string;
};

export type PasswordResetData = {
  password: string;
  passwordConfirmation: string;
};

export type ServiceData = {
  name: string;
  duration: string;
  price: string;
  categoryId: string;
  description: string;
  available: boolean;
};

export type Service = {
  id: number;
  name: string;
  duration: string;
  price: string;
  category: ServiceCategory;
  description: string;
  available: boolean;
  createdAt: string;
};

export type ServiceCategory = {
  id: number;
  name: string;
  createdAt: string;
};

export type AppointmentData = {
  service: null | Service;
  date: string;
  time: string;
  notes: string;
};
