import AboutText from "../../components/aboutText/aboutText.comp"
import AboutImg from "../../assets/imgs/RickandMortyAbout.jpg"

function About() {
    
  
    return (
        <div >
        <div>
          <h1 > Matias Urrutia de Teran </h1>
          <img  src={AboutImg} alt="Imagen del desarrollador" />
        </div>
        <div>
          <AboutText/>
        </div>
      </div>

    
    );
  }
  
  export default About;