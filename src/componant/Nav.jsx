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
              <div className="icon-div">
                <img src="/assets/checklist.png" alt="" width={20} height={20} />
                <a href="/">Today</a>
              </div>
              <p className="count">{taskcount.today}</p>
            </div>
          </li>
          <li>
            <div className="section-div">
              <div className="icon-div">
                <img src="/assets/fast-forward-double-right-arrows-symbol.png" alt="" width={15} height={15} />
                <a href="/Upcoming">Upcoming</a>
              </div>
              <p className="count">{taskcount.Upcoming}</p>
            </div>
          </li>
          <li>
            <div className="section-div">
              <div className="icon-div">
                <img src="/assets/calendar.png" alt="" width={15} height={15} />
                <a href="/Calender">Calender</a>
              </div>
              <p className="count">0</p>
            </div>
          </li>
          <li>
            <div className="icon-div">
              <img src="/assets/sticky-note.png" alt="" width={15} height={15} />
              <a href="/StickyWall">Sticky Wall</a>
            </div>
            
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
