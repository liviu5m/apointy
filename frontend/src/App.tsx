import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./components/pages/Verify";
import { AppProvider } from "./lib/AppProvider";
import Home from "./components/pages/Home";
import PasswordReset from "./components/pages/PasswordReset";
import SocialCallback from "./components/pages/SocialCallback";
import NonAuthRequiredRoute from "./components/middleware/NonAuthRequiredRoute";
import CustomerDashboard from "./components/pages/customer/CustomerDashboard";
import CustomerRoute from "./components/middleware/CustomerRoute";
import OwnerRoute from "./components/middleware/OwnerRoute";
import OwnerDashboard from "./components/pages/owner/OwnerDashboard";
import OwnerAppointments from "./components/pages/owner/OwnerAppointments";
import OwnerServices from "./components/pages/owner/OwnerServices";
import CustomerBookNow from "./components/pages/customer/CustomerBookNow";
import 'rc-slider/assets/index.css';
import CustomerAppointments from "./components/pages/customer/CustomerAppointments";
import TodaysQueue from "./components/pages/owner/TodaysQueue";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/customer/*"
              element={
                <CustomerRoute>
                  <Routes>
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                    <Route path="/book-now" element={<CustomerBookNow />} />
                    <Route path="/appointments" element={<CustomerAppointments />} />
                  </Routes>
                </CustomerRoute>
              }
            />
            <Route
              path="/owner/*"
              element={
                <OwnerRoute>
                  <Routes>
                    <Route path="/dashboard" element={<OwnerDashboard />} />
                    <Route path="/services" element={<OwnerServices />} />
                    <Route path="/queue" element={<TodaysQueue />} />
                    <Route
                      path="/appointments"
                      element={<OwnerAppointments />}
                    />
                  </Routes>
                </OwnerRoute>
              }
            />
            <Route
              path="/*"
              element={
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              }
            />
            <Route
              path="/auth/*"
              element={
                <NonAuthRequiredRoute>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route
                      path="/social-callback"
                      element={<SocialCallback />}
                    />
                  </Routes>
                </NonAuthRequiredRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
