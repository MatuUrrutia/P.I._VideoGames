import { Link, useLocation } from "react-router-dom";
import Filter from "../../views/filters/filters";
import "./navbar.styles.css";

function Navbar({ handleChange, handleSubmit, currentPage, setCurrentPage }) {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div className="search-box">
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>

        <Link to="/about">
          <button>About</button>
        </Link>

        <Link to="/create">
          <button>New Game</button>
        </Link>
      </div>
      <br />
      <div>
        {isHome && <Filter 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage} />}

        <form onChange={handleChange} style={isHome ? {} : { display: "none" }}>
          <input placeholder="Busqueda" type="search" />
          <button type="submit" onClick={handleSubmit}>
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;


