import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import { use } from "react";
import Landing from "./auth/Landing.jsx";
import { validateViaToken } from "./services/authService.js";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  const [user,setUserName] = useState("")
  const [logged,setLogged] = useState(false)
  useEffect(()=>{
    async function validateUser(){
      if(!logged){
        const token = localStorage.getItem("token")
        if(!token){
          setLogged(false)
          return
        }
        const responce = await validateViaToken(token)
        setUserName(responce.data.user)
        if(responce){
          setLogged(true)
        }
      }
    }
    validateUser();
  })

    if(logged == null) return <div>loading!!!</div>
  return (
    <>
      {logged ? (
        <App user={user} />
      ) : (
        <Landing setUserName={setUserName} setLogged={setLogged} />
      )}
    </>
  );
  
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
