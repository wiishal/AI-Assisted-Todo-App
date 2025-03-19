import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../componant/LandingPage";
import Login from "../componant/auth/Login";
import Signup from "../componant/auth/Signup";

function Landing({ setUserName, setLogged }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/login"
          element={<Login setUserName={setUserName} setLogged={setLogged} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup setUserName={setUserName} setLogged={setLogged} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Landing;
