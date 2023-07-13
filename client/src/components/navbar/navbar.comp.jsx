import { Link } from "react-router-dom";
import "./navbar.styles.css";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className="search-box">
      <Link to="/home">
        <button>Home</button>
      </Link>

      <Link to="/about">
        <button>About</button>
      </Link>

      <Link to="/create">
        <button>New Game</button>
      </Link>

     
        <button>Naxt Page</button>
        <button>Previous Page</button>
      


      <form onChange={handleChange}>
        <input placeholder="Busqueda" type="search" />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default Navbar;
