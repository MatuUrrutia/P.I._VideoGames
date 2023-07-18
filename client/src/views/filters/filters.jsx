import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  filterApiBd,
  filterGame,
  orderGames,
  resetFilters,
  getGenres,
} from "../../redux/actions";
import "./filter.styles.css";

function Filter() {
  const dispatch = useDispatch();
  const [filterGenre, setFilterGenre] = useState("Genero");
  const [filterApiBdt, setFilterApiBdt] = useState("Api-Creados");
  const [filterSort, setFilterSort] = useState("Ordenamiento");
  const allGenres = useSelector((state) => state.allGenres);


  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  console.log(allGenres)

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
        <option value="API & Created">API & Created</option>
        <option value="Created">Created</option>
        <option value="API">API</option>
      </select>

      <br />

      <select placeholder="genre" onChange={handleFilter} value={filterGenre}>
        <option value="Genero">Genero</option>
        {allGenres.map((genre) => (
          <option key={genre.id} value={genre.nombre}>
            {genre.nombre}
          </option>
        ))}
      </select>

      <br />

      <select placeholder="order" onChange={handleSort} value={filterSort}>
        <option value="Ordenamiento">Ordenamiento</option>
        {["a-z", "z-a"].map((genre) => (
          <option value={genre}>{genre}</option>
        ))}
      </select>

      <br />

      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}

export default Filter;
