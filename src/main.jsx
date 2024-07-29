import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";

import LoginNew from "./auth/LoginNew.jsx";

const Main = () => {

   const [isLogin, setIsLogin] = useState(false);
   const [currusername, setcurrUsername] = useState();


  useEffect(()=>{
    
      const token = localStorage.getItem("authToken");
      if (token) {
        axios
          .post("http://localhost:3001/auth/verifyToken", {
            token: token,
          })
          .then(function (response) {
            console.log(response.data.msg);
            handleLogin(true, response.data.user);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
  },[])

 
 

  const handleLogin = (status, user) => {
    setIsLogin(status);
    console.log(user);
    setcurrUsername(user);
  };

  return (
    <React.StrictMode>
      {isLogin ? (
        <App user={currusername} />
      ) : (
        <LoginNew variable={isLogin} handle={handleLogin} />
      )}
    </React.StrictMode>
  );

 
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
