import { Link } from "react-router-dom";
import "./card.styles.css";

function Card({ game }) {
  const {
    id,
    nombre,
    genero,
    imagen,
  } = game;

  return (
    <div className="card-container">
      <Link to={`/home/${id}`}>
        <h2>{nombre}</h2>
      </Link>

      <h3>{genero.join(" | ")}</h3>

      <div className="cardImage">
        <img src={imagen} alt="Imagen del personaje" height="300px" />
      </div>

    </div>
  );
}

export default Card;
