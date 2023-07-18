import Card from "../card/card.comp";

import "./cards.styles.css";


function Cards({ allVideogames, currentPage }) {
  const videogamesList = allVideogames;
  const cardsPerPage = 15;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = videogamesList.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="card-list">
      {currentCards?.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </div>
  );
}


export default Cards;