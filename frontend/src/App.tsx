import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get(`http://localhost:8080/auth/user`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
