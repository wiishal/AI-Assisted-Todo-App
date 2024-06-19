import { useState } from "react";
import "../style/Nav.css";
import Lists from "./Lists";

function Nav() {
  const [taskcount, SetTaskCount] = useState({
    today:12,
    Upcoming:5
  })
  return (
    <div className="Nav-div">
      <div className="menu">
        <h2>Menu</h2>
        <span>
          <img src="/assets/menu.png" alt="" width={20} height={20} />
        </span>
      </div>
      <div className="search-bar">
        <input className="inputBox-search" placeholder="Search" type="text" />
      </div>
      <nav>
        <span>Tasks</span>
        <ul>
          <li>
            <div className="section-div">
              <a href="/">Today</a>
              <p className="count">{taskcount.today}</p>
            </div>
          </li>
          <li>
            <div className="section-div">
              <a href="/Upcoming">Upcoming</a>
              <p className="count">{taskcount.Upcoming}</p>
            </div>
          </li>
          <li>
            <div className="section-div">
              <a href="/Calender">Calender</a>
              <p className="count">0</p>
            </div>
          </li>
          <li>
            <a href="/StickyWall">Sticky Wall</a>
          </li>
        </ul>
      </nav>
      <nav>
        <span>Lists</span>
        <ul>
          <li>
            <Lists props="Personal"></Lists>
          </li>
          <li>
            <Lists props="Work"></Lists>
          </li>

          
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
