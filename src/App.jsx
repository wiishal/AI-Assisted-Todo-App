import "./App.css"
import Nav from "./componant/Nav";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Calender from "./pages/Calender";
import StickyWall from "./pages/StickyWall";
import { useState } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'

function App({ user }) {
  let Component;
  const [count, setCount] = useState({
    today: 13,
    upcoming: 5,
  });
 
  return (
    <BrowserRouter>
      <div className="main">
        <Nav currUser={user} />
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/StickyWall" element={<StickyWall />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App