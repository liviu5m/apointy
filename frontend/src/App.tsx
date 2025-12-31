import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRequiredRoute from "./components/middleware/AuthRequiredRoute";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <AuthRequiredRoute>
                <Routes>
                  <Route path="/login" element={<Login />} />
                </Routes>
              </AuthRequiredRoute>
            }
          />
          <Route
            path="/auth/*"
            element={
              <AuthRequiredRoute>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-up" element={<Signup />} />
                </Routes>
              </AuthRequiredRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
