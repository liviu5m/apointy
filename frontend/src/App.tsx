import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRequiredRoute from "./components/middleware/NonAuthRequiredRoute";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./components/pages/Verify";
import { AppProvider } from "./lib/AppProvider";
import Home from "./components/pages/Home";
import PasswordReset from "./components/pages/PasswordReset";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
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
                <AuthRequiredRoute>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                  </Routes>
                </AuthRequiredRoute>
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
