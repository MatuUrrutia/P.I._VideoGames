import Card from "../card/card.comp";

import "./cards.styles.css";

function Cards({ allVideogames }) {
  const videogamesList = allVideogames;

  return (
    <div className="card-list">
      {videogamesList?.map((game) => (
        <Card game={game} />
      ))}
    </div>
  );
}

export default Cards;
