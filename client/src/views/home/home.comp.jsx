import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/index";
import Cards from "../../components/cards/cards.comp";
import "./home.styles.css";

function Home({ currentPage, maxPage, handleNextPage, handlePreviousPage, handleFirstPage, handleLastPage }) {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);



  return (
    <div className="home">
      <h1 className="home-title">Home Page</h1>

      <button onClick={handleFirstPage}>First Page</button>
      <button onClick={handlePreviousPage}>Previous Page</button>

      <h2>Page {currentPage}/{maxPage}</h2>

      <button onClick={handleNextPage}>Next Page</button>
      <button onClick={handleLastPage}>Last Page</button>
      <br />
      {allVideogames.length === 0 ? (
        <p>Cargando juegos...</p>
      ) : (
        <Cards allVideogames={allVideogames} currentPage={currentPage} />
      )}
    </div>
  );
}

export default Home;



