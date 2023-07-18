import AboutText from "../../components/aboutText/aboutText.comp";
import AboutImg from "../../assets/imgs/RickandMortyAbout.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <div>
        <h1> Matias Urrutia de Teran </h1>
        <img src={AboutImg} alt="Imagen del desarrollador" />
      </div>
      <div>
        <AboutText />
      </div>
      <Link to="/home">
        <button>X</button>
      </Link>
    </div>
  );
}

export default About;
