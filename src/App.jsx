import "./App.css"
import axios from "axios";
import Nav from "./componant/Nav";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Calender from "./pages/Calender";
import Expenses from "./pages/Expenses.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ListDetails from "./componant/ListDetails.jsx";
import TagDetails from "./componant/TagDetails.jsx";

function App({ user }) {
  const [count, setCount] = useState({
    today: 0,
    upcoming: 0,
    Tags:[],
  });
  
  return (
    <BrowserRouter>
      <div className="main">
        <Nav currUser={user}  />
        <Routes>
          <Route path="/" element={<Today navCount={setCount} />} />
          <Route path="/Upcoming" element={<Upcoming navCount={setCount} />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/Expenses" element={<Expenses />} />
          <Route path="/Lists/:item" element={<ListDetails />} />
          <Route path="/Tags/:tag" element={<TagDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App