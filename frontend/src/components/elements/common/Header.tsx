import { Calendar, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../lib/AppProvider";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/api/user";
import { getUserRole } from "@/lib/utils";

type Link = {
  label: string;
  url: string;
};

const Header = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: logout } = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      console.log(data);
      setUser(null);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const routes = {
    default: [
      { label: "Home", url: "/" },
      { label: "Features", url: "/features" },
      { label: "Contact", url: "/contact" },
    ],
    customer: [
      { label: "Dashboard", url: "/customer/dashboard" },
      { label: "Book Now", url: "/customer/book-now" },
      { label: "My Appointments", url: "/customer/appointments" },
    ],
    owner: [
      { label: "Dashboard", url: "/owner/dashboard" },
      { label: "Appointments", url: "/owner/appointments" },
      { label: "Services", url: "/owner/services" },
    ],
  };

  return (
    <header className="flex items-center justify-center py-5 bg-white/95 shadow fixed w-full h-[80px] z-10">
      <div className="container flex items-center justify-between">
        <Link to={"/"} className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0891B2] text-white flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Apointy</h1>
        </Link>
        <ul className="flex items-center justify-between gap-7">
          {routes[
            pathname == "/"
              ? "default"
              : (getUserRole(user) as keyof typeof routes)
          ].map((link: Link, i: number) => {
            return (
              <Link
                key={i}
                to={link.url}
                className={`text-sm font-semibold cursor-pointer ${
                  link.url == pathname
                    ? "text-[#0891B2]"
                    : "text-gray-600 hover:text-[#0891B2]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </ul>
        <div className="flex items-center justify-center gap-5">
          {!user ? (
            <>
              <Link
                to={"/auth/login"}
                className="text-sm font-semibold text-gray-600 hover:bg-gray-100 px-5 py-3 rounded-lg"
              >
                Log In
              </Link>
              <Link
                to={"/auth/sign-up"}
                className="text-sm font-semibold text-white bg-[#0891B2] hover:bg-[#097792] px-5 py-3 rounded-lg"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/${getUserRole(user)}/dashboard`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-[#f1f5f9]"
              >
                <User className="w-4" />
                <span>{user.fullName}</span>
              </Link>
              <button
                className="text-sm font-semibold text-gray-600 bg-white hover:bg-gray-100 px-5 py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-200 cursor-pointer"
                onClick={() => logout()}
              >
                <LogOut className="w-4" />
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
