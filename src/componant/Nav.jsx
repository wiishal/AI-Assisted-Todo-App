import { useState } from "react";
import "../style/Nav.css";

import { Link } from "react-router-dom";

function Nav({ currUser, count }) {
  const {today,upcoming} = count
  const [lists , setLists] = useState(["personal", "work"])
  return (
    <div className="Nav-div">
      <div className="menu">
        <h4>{currUser}</h4>
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
                <img
                  src="/assets/checklist.png"
                  alt=""
                  width={20}
                  height={20}
                />
                <Link to="/">Today</Link>
              </div>
              <p className="count">{today}</p>
            </div>
          </li>
          <li>
            <div className="section-div">
              <div className="icon-div">
                <img
                  src="/assets/fast-forward-double-right-arrows-symbol.png"
                  alt=""
                  width={15}
                  height={15}
                />
                <Link to="/Upcoming">Upcoming</Link>
              </div>
              <p className="count">{upcoming}</p>
            </div>
          </li>
          <li>
            <div className="section-div">
              <div className="icon-div">
                <img src="/assets/calendar.png" alt="" width={15} height={15} />
                <Link to="/Calender">Calender</Link>
              </div>
              <p className="count">0</p>
            </div>
          </li>
          <li>
            <div className="icon-div">
              <img
                src="/assets/sticky-note.png"
                alt=""
                width={15}
                height={15}
              />
              <Link to="/StickyWall">Sticky Wall</Link>
            </div>
          </li>
        </ul>
      </nav>
      <nav>
        <span>Lists</span>
        <ul>
          {lists.map((item, index) => (
            <li key={index}>
              <div className="section-div">
                <div className="icon-div">
                  <Link to={`/Lists/${item}`}>{item}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
