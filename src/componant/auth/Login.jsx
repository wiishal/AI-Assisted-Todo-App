import { useState } from "react";

import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setLogged, setUserName }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function setUserDetails(e, field) {
    setUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  async function handleLoginClick() {
    try {
      const response = await login(user);
      if (response) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUserName(response.data.user)
        setLogged(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (
    <div class="login-main">
      <div className="login-div">
        <div className="userInput-div">
          <label className="username-lable" htmlFor="username">
            User Name
          </label>
          <input
            onChange={(e) => {
              setUserDetails(e, "username");
            }}
            className="username-input"
            type="text"
          />
        </div>
        <div>
          <div className="passwordInput-div">
            <label className="password-lable" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => {
                setUserDetails(e, "password");
              }}
              className="password-input"
              type="text"
            />
          </div>
        </div>
        <div className="loginBtn-div">
          <button className="loginBtn" onClick={handleLoginClick}>
            log in
          </button>
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}