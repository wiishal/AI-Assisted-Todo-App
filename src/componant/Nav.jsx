import "../style/Nav.css";

function Nav() {
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
            <a href="/">Today</a>
          </li>
          <li>
            <a href="/Upcoming">Upcoming</a>
          </li>
          <li>
            <a href="/Calender">Calender</a>
          </li>
          <li>
            <a href="/StickyWall">Sticky Wall</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
