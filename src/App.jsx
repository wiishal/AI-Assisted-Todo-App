import "./App.css"
import Nav from "./componant/Nav";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Calender from "./pages/Calender";
import Expenses from "./pages/Expenses.jsx";
import { useState } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ListDetails from "./componant/ListDetails.jsx";

function App({ user }) {
  let Component;
  const [count, setCount] = useState({
    today: 0,
    upcoming: 0,
  });
 
  return (
    <BrowserRouter>
      <div className="main">
        <Nav currUser={user} count={count} />
        <Routes>
          <Route path="/" element={<Today navCount={setCount} />} />
          <Route path="/Upcoming" element={<Upcoming navCount={setCount} />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/Expenses" element={<Expenses />} />
          <Route path="/Lists/:item" element={<ListDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App