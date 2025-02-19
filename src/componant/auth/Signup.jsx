import { useState } from "react";
import { signUp } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setLogged, setUserName }) {
  const [user, setUser] = useState({ username: "", password: "" });
   const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  function setUserDetails(e, field) {
    setUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  async function handleSignUpClick() {
      setIsProcessing(true);
    try {
      const response = await signUp(user);
      if (response) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUserName(response.data.user);
        setLogged(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  return (
    <div class="login-main">
      <div className="login-logo">
        <p onClick={() => navigate("/")} className="login-name">
          TODO
        </p>
      </div>
      <div className="login-bmain">
        <div className="login-tagline">
          <p className="login-tagLineText">
            {/* Start Organizing Now!" */}
            Start <p> Organizing</p> Now!
          </p>
        </div>
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
            <button className="loginBtn" onClick={handleSignUpClick}>
              {isProcessing ? "processing..." : "Sign in"}
            </button>
            <Link to="/login">Already have an Accout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
