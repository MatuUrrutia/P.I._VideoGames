import { Link } from "react-router-dom";
import "./card.styles.css";

function Card({ game }) {
  const {
    id,
    nombre,
    plataformas,
    fecha_de_lanzamiento,
    rating,
    genero,
    imagen,
  } = game;

  return (
    <div className="card-container">
      
      <Link to={`/home/${id}`}>
        <h2>{nombre}</h2>
      </Link>

      <h3>{fecha_de_lanzamiento}</h3>
      <h3>{plataformas}</h3>
      <h3>{rating}</h3>
      <h3>{genero}</h3>

      <div className="cardImage">
        <img src={imagen} alt="Imagen del personaje" height="300px" />
      </div>

    </div>
  );
}

export default Card;
