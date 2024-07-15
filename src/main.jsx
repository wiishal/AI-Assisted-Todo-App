import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import Login from './auth/Login.jsx'

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [currusername, setcurrUsername] = useState()

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
        <Login variable={isLogin} handle={handleLogin} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
