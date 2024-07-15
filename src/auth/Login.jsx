import { useState } from "react";
import axios from "axios"

function Login({ variable, handle }) {
  const [username, setUsername] = useState("")
  const [password, setpassword] = useState("");
  console.log(variable);
handle(true, "vishal"); ////-------------------------------> devlopment
  function handleUsename(e){
    setUsername(e.target.value)
  }
  function handlePassword(e) {
    setpassword(e.target.value);
  }
  function submit(){
    console.log("in submit", username)
    axios
      .post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem('authToken', response.data.token)
        handle(true, response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  return (
    <div>
    <h3>login</h3>
      <div className="username-div">
        <label htmlFor="">Username</label>
        <input 
        value={username}
        onChange={handleUsename}
        type="text" />
      </div>
      <div className="password-Div">
        <label htmlFor="">Password</label>
        <input
        value={password}
        onChange={handlePassword}
        type="text" />
      </div>
      <div className="submit-btn">
    <button onClick={submit}>submit</button>
    <button> forgetPassword</button>

      </div>
    </div>
  );
}

export default Login