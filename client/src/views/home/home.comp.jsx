import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/index";
import Cards from "../../components/cards/cards.comp";
import "./home.styles.css";

function Home({ currentPage, maxPage }) {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="home-title">Home Page</h1>
      <h2>Page {currentPage}/{maxPage}</h2>
      {allVideogames.length === 0 ? (
        <p>Cargando juegos...</p>
      ) : (
        <Cards allVideogames={allVideogames} currentPage={currentPage} />
      )}
    </div>
  );
}

export default Home;


