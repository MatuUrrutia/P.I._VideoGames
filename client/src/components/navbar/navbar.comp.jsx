import { Link } from "react-router-dom";
import Filter from "../../views/filters/filters"
import "./navbar.styles.css";

function Navbar({ handleChange, handleSubmit, handleNextPage, handlePreviousPage }) {
  
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

      <Filter />
     
      <button onClick={handlePreviousPage}>Previous Page</button>
      
      <button onClick={handleNextPage}>Next Page</button>


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
