import "./App.css"
import Nav from "./componant/Nav";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Calender from "./pages/Calender";
import StickyWall from "./pages/StickyWall";
import { useState } from "react";
function App() {
  let Component;
 const [count, setCount] = useState({
  today:13,
  upcoming:5
 })
  switch (window.location.pathname) {
    case "/":
      Component = Today;
      break;
    case "/Upcoming":
      Component = Upcoming;
      break;
    case "/Calender":
      Component = Calender;
      break;
    case "/StickyWall":
      Component = StickyWall;
      break;
    
  }
  return (
    <div className="main">
      <Nav props={count} />
      <Component props={count} />
    </div>
  );
}

export default App