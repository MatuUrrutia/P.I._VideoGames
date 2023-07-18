import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  filterApiBd,
  filterGame,
  orderGames,
  orderRating,
  resetFilters,
  getGenres,
} from "../../redux/actions";
import "./filter.styles.css";

function Filter() {
  const dispatch = useDispatch();
  const [filterGenre, setFilterGenre] = useState("Genero");
  const [filterApiBdt, setFilterApiBdt] = useState("Api-Creados");
  const [filterSort, setFilterSort] = useState("Ordenamiento");
  const [filterSortRating, setFilterSortRating] = useState("Rating"); 
  const allGenres = useSelector((state) => state.allGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


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

 function handleSortRating(e){
    setFilterSortRating(e.target.value);
    dispatch(orderRating(e.target.value));
  }



  const handleResetFilters = () => {
    setFilterGenre("Genero"); 
    setFilterApiBdt("Api-Creados"); 
    setFilterSort("Ordenamiento");
    setFilterSortRating("Rating") 
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
        {["a-z", "z-a"].map((order) => (
          <option value={order}>{order}</option>
        ))}
      </select>

      <br />

      <select placeholder='orderRating' onChange={handleSortRating} value={filterSortRating}>
        <option value="Rating">Rating</option>
        {["1 A 5","5 A 1"].map((order) => (
          <option value={order}>{order}</option>
        ))}
      </select>
      <br />

      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}

export default Filter;
