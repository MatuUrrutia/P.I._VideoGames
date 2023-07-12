import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames, getByName } from "../../redux/actions/index";
import Navbar from "../../components/navbar/navbar.comp";
import Cards from "../../components/cards/cards.comp";
import "./home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  //!FILTRO CON EL BACK-END

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString))
  }

  
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  
  return (
    <div className="home">
      <h1 className="home-title">Home Page</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={allVideogames} />
    </div>
  );
}

export default Home;







//! FILTRO SOBRE EL ESTADO
// const [filtered, setFiltered] = useState(allVideogames);
// const [searchString, setSearchString] = useState("");

// function handleChange(e) {
//   e.preventDefault();
//   setSearchString(e.target.value);
// }

// function handleSubmit(e) {
//   e.preventDefault();
//   const filtered = allVideogames.filter((game) =>
//     game.name.toLowerCase().includes(searchString.toLowerCase())
//   );
//   setFiltered(filtered);
// }