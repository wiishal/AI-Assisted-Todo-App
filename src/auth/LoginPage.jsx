import "../style/Login.css"
import Login from "../componant/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../componant/auth/Signup";

export default function LoginPage({ setLogged, setUserName }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setLogged={setLogged} setUserName={setUserName} />}
        />
        <Route
          path="/signup"
          element={<Signup setLogged={setLogged} setUserName={setUserName} />}
        />
      </Routes>
    </BrowserRouter>
  );
}