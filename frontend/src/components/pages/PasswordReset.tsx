import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordResetEmail from "../elements/auth/PasswordResetEmail";
import PasswordResetCode from "../elements/auth/PasswordResetCode";
import PasswordResetForm from "../elements/auth/PasswordResetForm";

const PasswordReset = () => {
  const [state, setState] = useState("email");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.state);

    if (!location.state?.fromPasswordReset) {
      navigate("/auth/login", { replace: true });
    } else {
      setState(location.state.page);
      setEmail(location.state.email);
    }
  }, [location, navigate]);

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0891B2] text-white flex items-center justify-center">
          <Calendar className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Apointy</h1>
      </div>
      <div className="p-10 bg-white shadow rounded-lg">
        {state == "email" && <PasswordResetEmail />}
        {state == "code" && <PasswordResetCode email={email} />}
        {state == "reset" && <PasswordResetForm email={email} />}
      </div>
    </div>
  );
};

export default PasswordReset;
