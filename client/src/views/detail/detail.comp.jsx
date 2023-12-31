import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearGameDetail } from "../../redux/actions/index";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.gameDetail);

  useEffect(() => {
    dispatch(getById(id));

    return () => {
      dispatch(clearGameDetail());
    };
  }, [dispatch, id]);

  if (Object.keys(gameDetail).length === 0) {
    return <div>Cargando...</div>;
  }

  const {
    nombre,
    plataformas,
    fecha_de_lanzamiento,
    rating,
    genero,
    imagen,
    descripcion,
  } = gameDetail;

  return (
    <div>
      <h1>{nombre}</h1>
      <h3>{fecha_de_lanzamiento}</h3>
      <h3>{plataformas.join(" | ")}</h3>
      <h3>{rating}</h3>
      <h3>{genero.join(" | ")}</h3>
      <p>{descripcion}</p>
      <div>
        <img src={imagen} alt="Imagen del juego" height="300px" />
      </div>
      <div>
        <Link to="/home">
          <button>X</button>
        </Link>
      </div>
    </div>
  );
}

export default Detail;
