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
  businessDto: Business;
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

export type Appointment = {
  id: number;
  date: string;
  time: string;
  service: Service;
  notes: string;
  user_id: number;
  status: string;
  userDto: User;
};

export type Business = {
  id: number;
  name: string;
  address: string;
  city: string;
  description: string;
  imageUrl: string;
  user: User;
};

export type BusinessHolidayData = {
  type: string;
  reason: string;
  startTime: string;
  endTime: string;
  date: undefined | Date;
  daysRecurring: boolean[];
};
