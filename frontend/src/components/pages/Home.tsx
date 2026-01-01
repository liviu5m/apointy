import { logoutUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

const Home = () => {
  const { mutate: logout } = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
};

export default Home;
