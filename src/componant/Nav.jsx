import "../style/Nav.css";

function Nav(){

    return (
      <div className="Nav-bar">
        <nav>
          <ul>
            <li>
              <a href="/Today">Today</a>
              <a href="/upcoming">upcoming</a>
            </li>
          </ul>
        </nav>
      </div>
    );
}

export default Nav