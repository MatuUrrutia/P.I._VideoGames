import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames, getByName} from "../../redux/actions/index";
import Navbar from "../../components/navbar/navbar.comp";
import Cards from "../../components/cards/cards.comp";
import "./home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);


  //? ESTE ESTADO Y LOS HANDLERS ESTAN CONFIGURADOS PARA LA BUSQUEDA EN LA NAVBAR
  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString))
  }


  //? CARGA LA HOME PAGE CON TODOS LOS JUEGOS AL ENTRAR 
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  
  return (
    <div className="home">
      <h1 className="home-title">Home Page</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={allVideogames}   />
    </div>
  );
}


export default Home;


