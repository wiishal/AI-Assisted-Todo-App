import "./App.css"
import Nav from "./componant/Nav";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";

function App() {
  let Component;

  switch (window.location.pathname) {
    case "/":
      Component = Today;
      break;
    case "/upcoming":
      Component = Upcoming;
      break;
    default:
      Component = Today; // Fallback to Today if the path doesn't match
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