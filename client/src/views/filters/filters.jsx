import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  filterApiBd,
  filterGame,
  orderGames,
  resetFilters,
} from "../../redux/actions";
import "./filter.styles.css";

function Filter() {
  const dispatch = useDispatch();
  const [filterGenre, setFilterGenre] = useState("Genero");
  const [filterApiBdt, setFilterApiBdt] = useState("Api-Creados");
  const [filterSort, setFilterSort] = useState("Ordenamiento");

  const handleApiBD = (e) => {
    setFilterApiBdt(e.target.value);
    dispatch(filterApiBd(e.target.value));
  };

  function handleFilter(e) {
    setFilterGenre(e.target.value);
    dispatch(filterGame(e.target.value));
  }

  function handleSort(e) {
    setFilterSort(e.target.value);
    dispatch(orderGames(e.target.value));
  }

  const handleResetFilters = () => {
    setFilterGenre("Genero"); // Establecer el valor por defecto al hacer clic en Reset Filters
    setFilterApiBdt("Api-Creados"); // Establecer el valor por defecto al hacer clic en Reset Filters
    setFilterSort("Ordenamiento"); // Establecer el valor por defecto al hacer clic en Reset Filters
    dispatch(resetFilters());
  };

  return (
    <div>
      <select placeholder="api-bd" onChange={handleApiBD} value={filterApiBdt}>
        <option value="Api-Creados">API-CREADOS</option>
        <option value="CREADOS">CREADOS</option>
        <option value="API">API</option>
      </select>

      <br />

      <select placeholder="genre" onChange={handleFilter} value={filterGenre}>
        <option value="Genero">Genero</option>
        {[
          "Action",
          "Indie",
          "Adventure",
          "RPG",
          "Strategy",
          "Shooter",
          "Casual",
          "Simulation",
          "Puzzle",
          "Arcade",
          "Platformer",
          "Massively Multiplayer",
          "Racing",
          "Sports",
          "Fighting",
          "Family",
          "Board Games",
          "Educational",
        ].map((genre) => (
          <option value={genre}>{genre}</option>
        ))}
      </select>

      <br />

      <select placeholder="order" onChange={handleSort} value={filterSort}>
        <option value="Ordenamiento">Ordenamiento</option>
        {["az", "za"].map((genre) => (
          <option value={genre}>{genre}</option>
        ))}
      </select>

      <br />

      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}

export default Filter;
