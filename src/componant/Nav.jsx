import { useState } from "react";
import "../style/Nav.css";
import Tags from "./Tags";
import { Link } from "react-router-dom";

function Nav({ currUser, count }) {

  const {today,upcoming} = count
  
  
  const [lists, setLists] = useState([
    {
      list: "personal",
      style: { backgroundColor: "red" },
    },
    {
      list: "work",
      style: { backgroundColor: "blue" },
    },
  ]);


  const [listStyle, setListstyle] = useState({ width: "10px",
    height: "10px",
    borderRadius: "5px",
  backgroundColor:"red"})






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
                src="/assets/dollar.png"
                alt=""
                width={15}
                height={15}
              />
              <Link to="/Expenses">Expenses</Link>
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
                  <div style={{ ...listStyle, ...item.style }}></div>
                  <Link to={`/Lists/${item.list}`}>{item.list}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="nav-tags">
          <Tags />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
