import { Link } from "react-router-dom";
import "./landing.styles.css";

function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        <Link to="/home">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
