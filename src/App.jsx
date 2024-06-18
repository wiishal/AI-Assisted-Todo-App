import "./App.css"
import Nav from "./componant/Nav";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Calender from "./pages/Calender";
import StickyWall from "./pages/StickyWall";
function App() {
  let Component;
 
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
      <Nav />
      <Component />
    </div>
  );
}

export default App