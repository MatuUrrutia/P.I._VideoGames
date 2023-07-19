import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres } from "../../redux/actions/index";
import defaultPic from "../assets/imgs/videogame.png";
import "./create.styles.css";

function Create() {
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.allGenres);

  const platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Android",
    "Apple Macintosh",
    "Linux",
    "Nintendo",
    "iOS",
    "Web",
  ];

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
    plataformas: [],
    fecha_de_lanzamiento: "",
    genero: [],
    rating: 0,
    imagen: "",
    descripcion: "",
  });

  const [error, setError] = useState({
    nombre: "*",
    plataformas: "",
    fecha_de_lanzamiento: "*",
    genero: "",
    rating: "",
    imagen: "",
    descripcion: "*",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const handleGenreChange = (e) => {
    const { value } = e.target;

    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(value)) {
        return prevSelectedGenres.filter((genre) => genre !== value);
      } else {
        return [...prevSelectedGenres, value];
      }
    });

    setError((prevError) => ({
      ...prevError,
      genero: "",
    }));
  };

  const handlePlatformChange = (e) => {
    const { value } = e.target;

    setSelectedPlatforms((prevSelectedPlatforms) => {
      if (prevSelectedPlatforms.includes(value)) {
        return prevSelectedPlatforms.filter((platform) => platform !== value);
      } else {
        return [...prevSelectedPlatforms, value];
      }
    });

    setError((prevError) => ({
      ...prevError,
      plataformas: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const fieldError = validateField(name, value);

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: fieldError,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const imageUrl = input.imagen.trim() === "" ? defaultPic : input.imagen;

    const updatedInput = {
      ...input,
      imagen: imageUrl,
      genero: selectedGenres,
      plataformas: selectedPlatforms,
    };

    dispatch(createGame(updatedInput));

    setInput({
      nombre: "",
      plataformas: [],
      fecha_de_lanzamiento: "",
      genero: [],
      rating: 0,
      imagen: "",
      descripcion: "",
    });
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setError({
      nombre: "*",
      plataformas: "",
      fecha_de_lanzamiento: "*",
      genero: "",
      rating: "",
      imagen: "",
      descripcion: "*",
    });
  }

  const validateField = (name, value) => {
    let error = "";

    if (name === "nombre") {
      if (value.length === 0) {
        error = "El nombre no puede estar vacío";
      } else if (value.length > 40) {
        error = "El nombre no puede tener más de 40 caracteres";
      }
    } else if (name === "descripcion") {
      if (!value.length) {
        error = "La descripción no puede estar vacía";
      }
    } else if (name === "plataformas") {
      if (value.length === 0) {
        error = "Debe seleccionar al menos una plataforma";
      }
    } else if (name === "fecha_de_lanzamiento") {
      if (!value.length || !isDate(value)) {
        error = "Debe ser una fecha en formato aaaa-mm-dd";
      }
    } else if (name === "rating") {
      if (value.length === 0) {
        error = "El rating no puede estar vacío";
      } else if (!isValidRating(value)) {
        error = "Debe ser un número entre 0 y 5 con hasta 2 decimales";
      }
    } else if (name === "genero") {
      if (value.length === 0) {
        error = "Debe seleccionar al menos un género";
      }
    } else if (name === "imagen") {
      if (value.trim() !== "" && !isValidImageUrl(value)) {
        error = "Debe ser una URL de imagen válida (png, jpg, jpeg, gif, svg)";
      }
    }

    return error;
  };

  const isDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const isValidRating = (rating) => {
    const regex = /^([0-4](\.\d{1,2})?|5(\.0{1,2})?)$/;
    return regex.test(rating);
  };

  const isValidImageUrl = (url) => {
    const regex = /^https?:\/\/[^ ]+\.(?:png|jpg|jpeg|gif|svg)(\?[^ ]*)?$/i;
    return regex.test(url);
  };

  const isFormValid =
    input.nombre.trim() !== "" &&
    input.descripcion.trim() !== "" &&
    selectedPlatforms.length > 0 &&
    input.fecha_de_lanzamiento.trim() !== "" &&
    input.rating >= 0 &&
    input.rating <= 5 &&
    selectedGenres.length > 0 &&
    Object.values(error).every((errorMsg) => errorMsg === "");

  return (
    <div>
      <form>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={input.nombre}
            onChange={handleChange}
          />
          {error.nombre && <span>{error.nombre}</span>}
        </div>

        <div>
          <label>Plataformas: </label>
          {platforms.map((platform) => (
            <div key={platform}>
              <input
                id={platform}
                type="checkbox"
                name="plataformas"
                value={platform}
                checked={selectedPlatforms.includes(platform)}
                onChange={handlePlatformChange}
              />
              <label htmlFor={platform}>{platform}</label>
            </div>
          ))}
          {error.plataformas && <span>{error.plataformas}</span>}
        </div>

        <div>
          <label>Fecha de lanzamiento: </label>
          <input
            type="date"
            name="fecha_de_lanzamiento"
            value={input.fecha_de_lanzamiento}
            onChange={handleChange}
          />
          {error.fecha_de_lanzamiento && (
            <span>{error.fecha_de_lanzamiento}</span>
          )}
        </div>

        <div>
          <label>Género: </label>
          {allGenres.map((genre) => (
            <div key={genre.id}>
              <input
                type="checkbox"
                name="genero"
                value={genre.nombre}
                checked={selectedGenres.includes(genre.nombre)}
                onChange={handleGenreChange}
              />
              <label htmlFor={genre.id}>{genre.nombre}</label>
            </div>
          ))}
          {error.genero && <span>{error.genero}</span>}
        </div>

        <div>
          <label>Rating: </label>
          <input
            type="range"
            name="rating"
            min="0"
            max="5"
            step="0.01"
            value={input.rating}
            onChange={handleChange}
          />
          <div className="rating-label">{input.rating}</div>
          {error.rating && <span>{error.rating}</span>}
        </div>

        <div>
          <label>Imagen: </label>
          <textarea
            name="imagen"
            placeholder="Ingresa la URL de la imagen"
            value={input.imagen}
            onChange={handleChange}
            cols={50}
            rows={1}
          />
          {error.imagen && <span>{error.imagen}</span>}
        </div>

        <div>
          <label>Descripción: </label>
          <textarea
            name="descripcion"
            placeholder="Ingresa la descripción del juego"
            value={input.descripcion}
            onChange={handleChange}
            rows={10}
            cols={50}
          />
          {error.descripcion && <span>{error.descripcion}</span>}
        </div>

        {isFormValid && (
          <button type="submit" onClick={handleSubmit}>
            SUBMIT
          </button>
        )}
      </form>
    </div>
  );
}

export default Create;




// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createGame, getGenres } from "../../redux/actions/index";
// import "./create.styles.css";

// function Create() {
//   const dispatch = useDispatch();

//   const allGenres = useSelector((state) => state.allGenres);

//   const platforms = [
//     "PC",
//     "PlayStation",
//     "Xbox",
//     "Android",
//     "Apple Macintosh",
//     "Linux",
//     "Nintendo",
//     "iOS",
//     "Web",
//   ];

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: [],
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: 0,
//     imagen: "",
//     descripcion: "",
//   });

//   const [error, setError] = useState({
//     nombre: "*",
//     plataformas: "",
//     fecha_de_lanzamiento: "*",
//     genero: "",
//     rating: "",
//     imagen: "",
//     descripcion: "*",
//   });

//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);

//   const handleGenreChange = (e) => {
//     const { value } = e.target;

//     setSelectedGenres((prevSelectedGenres) => {
//       if (prevSelectedGenres.includes(value)) {
//         return prevSelectedGenres.filter((genre) => genre !== value);
//       } else {
//         return [...prevSelectedGenres, value];
//       }
//     });

//     setError((prevError) => ({
//       ...prevError,
//       genero: "",
//     }));
//   };

//   const handlePlatformChange = (e) => {
//     const { value } = e.target;

//     setSelectedPlatforms((prevSelectedPlatforms) => {
//       if (prevSelectedPlatforms.includes(value)) {
//         return prevSelectedPlatforms.filter((platform) => platform !== value);
//       } else {
//         return [...prevSelectedPlatforms, value];
//       }
//     });

//     setError((prevError) => ({
//       ...prevError,
//       plataformas: "",
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     const fieldError = validateField(name, value);

//     setInput((prevInput) => ({
//       ...prevInput,
//       [name]: value,
//     }));

//     setError((prevError) => ({
//       ...prevError,
//       [name]: fieldError,
//     }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const imageUrl =
//       input.imagen.trim() === ""
//         ? "https://i.guim.co.uk/img/media/cb4244417e49c9841188396ed8c9fe3d3b0a3331/0_0_5497_3641/master/5497.jpg?width=620&dpr=1&s=none"
//         : input.imagen;

//     const updatedInput = {
//       ...input,
//       imagen: imageUrl,
//       genero: selectedGenres,
//       plataformas: selectedPlatforms,
//     };

//     dispatch(createGame(updatedInput));

//     setInput({
//       nombre: "",
//       plataformas: [],
//       fecha_de_lanzamiento: "",
//       genero: [],
//       rating: 0,
//       imagen: "",
//       descripcion: "",
//     });
//     setSelectedGenres([]);
//     setSelectedPlatforms([]);
//     setError({
//       nombre: "*",
//       plataformas: "*",
//       fecha_de_lanzamiento: "*",
//       genero: "*",
//       rating: "*",
//       imagen: "",
//       descripcion: "*",
//     });
//   }

//   const validateField = (name, value) => {
//     let error = "";

//     if (name === "nombre") {
//       if (value.length === 0) {
//         error = "El nombre no puede estar vacío";
//       } else if (value.length > 40) {
//         error = "El nombre no puede tener más de 40 caracteres";
//       }
//     } else if (name === "descripcion") {
//       if (!value.length) {
//         error = "La descripción no puede estar vacía";
//       }
//     } else if (name === "plataformas") {
//       if (value.length === 0) {
//         error = "Debe seleccionar al menos una plataforma";
//       }
//     } else if (name === "fecha_de_lanzamiento") {
//       if (!value.length || !isDate(value)) {
//         error = "Debe ser una fecha en formato aaaa-mm-dd";
//       }
//     } else if (name === "rating") {
//       if (value.length === 0) {
//         error = "El rating no puede estar vacío";
//       } else if (!isValidRating(value)) {
//         error = "Debe ser un número entre 0 y 5 con hasta 2 decimales";
//       }
//     } else if (name === "genero") {
//       if (value.length === 0) {
//         error = "Debe seleccionar al menos un género";
//       }
//     }

//     return error;
//   };

//   const isDate = (date) => {
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     return regex.test(date);
//   };

//   const isValidRating = (rating) => {
//     const regex = /^([0-4](\.\d{1,2})?|5(\.0{1,2})?)$/;
//     return regex.test(rating);
//   };

//   const isFormValid =
//     input.nombre.trim() !== "" &&
//     input.descripcion.trim() !== "" &&
//     selectedPlatforms.length > 0 &&
//     input.fecha_de_lanzamiento.trim() !== "" &&
//     input.rating >= 0 &&
//     input.rating <= 5 &&
//     selectedGenres.length > 0 &&
//     Object.values(error).every((errorMsg) => errorMsg === "");

 

//   return (
//     <div>
//       <form>
//         <div>
//           <label>Nombre: </label>
//           <input
//             type="text"
//             name="nombre"
//             value={input.nombre}
//             onChange={handleChange}
//           />
//           {error.nombre && <span>{error.nombre}</span>}
//         </div>

//         <div>
//           <label>Plataformas: </label>
//           {platforms.map((platform) => (
//             <div key={platform}>
//               <input
//                 id={platform}
//                 type="checkbox"
//                 name="plataformas"
//                 value={platform}
//                 checked={selectedPlatforms.includes(platform)}
//                 onChange={handlePlatformChange}
//               />
//               <label htmlFor={platform}>{platform}</label>
//             </div>
//           ))}
//            {error.plataformas && <span>{error.plataformas}</span>}
          
//         </div>

//         <div>
//           <label>Fecha de lanzamiento: </label>
//           <input
//             type="date"
//             name="fecha_de_lanzamiento"
//             value={input.fecha_de_lanzamiento}
//             onChange={handleChange}
//           />
//           {error.fecha_de_lanzamiento && <span>{error.fecha_de_lanzamiento}</span>}
//         </div>

//         <div>
//           <label>Género: </label>
//           {allGenres.map((genre) => (
//             <div key={genre.id}>
//               <input
//                 type="checkbox"
//                 name="genero"
//                 value={genre.nombre}
//                 checked={selectedGenres.includes(genre.nombre)}
//                 onChange={handleGenreChange}
//               />
//               <label htmlFor={genre.id}>{genre.nombre}</label>
//             </div>
//           ))}
//           {error.genero && <span>{error.genero}</span>}
//         </div>

//         <div>
//           <label>Rating: </label>
//           <input
//             type="range"
//             name="rating"
//             min="0"
//             max="5"
//             step="0.01"
//             value={input.rating}
//             onChange={handleChange}
//           />
//           <div className="rating-label">{input.rating}</div>
//           {error.rating && <span>{error.rating}</span>}
//         </div>

//         <div>
//           <label>Imagen: </label>
//           <textarea
//             name="imagen"
//             placeholder="Ingresa la URL de la imagen"
//             value={input.imagen}
//             onChange={handleChange}
//             cols={50}
//             rows={1}
//           />
//           {error.imagen && <span>{error.imagen}</span>}
//         </div>

//         <div>
//           <label>Descripción: </label>
//           <textarea
//             name="descripcion"
//             placeholder="Ingresa la descripción del juego"
//             value={input.descripcion}
//             onChange={handleChange}
//             rows={10}
//             cols={50}
//           />
//           {error.descripcion && <span>{error.descripcion}</span>}
//         </div>

//         {isFormValid && (
//           <button type="submit" onClick={handleSubmit}>
//             SUBMIT
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Create;





//!________________________________



// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createGame, getGenres } from "../../redux/actions/index";
// import "./create.styles.css";

// function Create() {
//   const dispatch = useDispatch();

//   const allGenres = useSelector((state) => state.allGenres);

//   const platforms = [
//     "PC",
//     "PlayStation",
//     "Xbox",
//     "Android",
//     "Apple Macintosh",
//     "Linux",
//     "Nintendo",
//     "iOS",
//     "Web",
//   ];

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: [],
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: 0,
//     imagen: "",
//     descripcion: "",
//   });

//   const [error, setError] = useState({
//     nombre: "*",
//     plataformas: "",
//     fecha_de_lanzamiento: "*",
//     genero: "",
//     rating: "",
//     imagen: "*",
//     descripcion: "*",
//   });

//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);

//   const handleGenreChange = (e) => {
//     const { value } = e.target;

//     setSelectedGenres((prevSelectedGenres) => {
//       if (prevSelectedGenres.includes(value)) {
//         // Si el género ya está seleccionado, se remueve de la lista
//         return prevSelectedGenres.filter((genre) => genre !== value);
//       } else {
//         // Si el género no está seleccionado, se agrega a la lista
//         return [...prevSelectedGenres, value];
//       }
//     });
//   };

//   const handlePlatformChange = (e) => {
//     const { value } = e.target;

//     setSelectedPlatforms((prevSelectedPlatforms) => {
//       if (prevSelectedPlatforms.includes(value)) {
//         // Si la plataforma ya está seleccionada, se remueve de la lista
//         return prevSelectedPlatforms.filter((platform) => platform !== value);
//       } else {
//         // Si la plataforma no está seleccionada, se agrega a la lista
//         return [...prevSelectedPlatforms, value];
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     const fieldError = validateField(name, value);

//     setInput((prevInput) => ({
//       ...prevInput,
//       [name]: value,
//     }));

//     setError((prevError) => ({
//       ...prevError,
//       [name]: fieldError,
//     }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const imageUrl =
//       input.imagen.trim() === ""
//         ? "https://i.guim.co.uk/img/media/cb4244417e49c9841188396ed8c9fe3d3b0a3331/0_0_5497_3641/master/5497.jpg?width=620&dpr=1&s=none"
//         : input.imagen;

//     const updatedInput = {
//       ...input,
//       imagen: imageUrl,
//       genero: selectedGenres,
//       plataformas: selectedPlatforms,
//     };

//     dispatch(createGame(updatedInput));

//     setInput({
//       nombre: "",
//       plataformas: [],
//       fecha_de_lanzamiento: "",
//       genero: [],
//       rating: 0,
//       imagen: "",
//       descripcion: "",
//     });
//     setSelectedGenres([]);
//     setSelectedPlatforms([]);
//     setError({
//       nombre: "",
//       plataformas: "",
//       fecha_de_lanzamiento: "",
//       genero: "",
//       rating: "",
//       imagen: "",
//       descripcion: "",
//     });
//   }

//   const validateField = (name, value) => {
//     let error = "";

//     if (name === "nombre") {
//       if (value.length === 0) {
//         error = "El nombre no puede estar vacío";
//       } else if (value.length > 40) {
//         error = "El nombre no puede tener más de 40 caracteres";
//       } else if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
//         error = "El nombre solo puede contener letras, números y espacios";
//       }
//     } else if (name === "descripcion") {
//       if (!value.length) {
//         error = "La descripción no puede estar vacía";
//       }
//     } else if (name === "plataformas") {
//       if (value.length === 0) {
//         error = "Debe seleccionar al menos una plataforma";
//       }
//     } else if (name === "fecha_de_lanzamiento") {
//       if (!value.length || !isDate(value)) {
//         error = "Debe ser una fecha en formato aaaa-mm-dd";
//       }
//     } else if (name === "rating") {
//       if (value.length === 0) {
//         error = "El rating no puede estar vacío";
//       } else if (!isValidRating(value)) {
//         error = "Debe ser un número entre 0 y 5 con hasta 2 decimales";
//       }
//     } else if (name === "genero") {
//       if (value.length === 0) {
//         error = "Debe seleccionar al menos un género";
//       }
//     }

//     return error;
//   };

//   const isDate = (date) => {
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     return regex.test(date);
//   };

//   const isValidRating = (rating) => {
//     const regex = /^([0-4](\.\d{1,2})?|5(\.0{1,2})?)$/;
//     return regex.test(rating);
//   };

//   const isFormValid =
//     input.nombre.trim() !== "" &&
//     input.descripcion.trim() !== "" &&
//     selectedPlatforms.length > 0 &&
//     input.fecha_de_lanzamiento.trim() !== "" &&
//     input.rating.trim() !== "" &&
//     selectedGenres.length > 0 &&
//     Object.values(error).every((errorMsg) => errorMsg === "");

//   return (
//     <div>
//       <form>
//         <div>
//           <label>Nombre: </label>
//           <input
//             type="text"
//             name="nombre"
//             value={input.nombre}
//             onChange={handleChange}
//           />
//           {error.nombre && <span>{error.nombre}</span>}
//         </div>

//         <div>
//           <label>Plataformas: </label>
//           {platforms.map((platform) => (
//             <div key={platform}>
//               <input
//                 id={platform}
//                 type="checkbox"
//                 name="plataformas"
//                 value={platform}
//                 checked={selectedPlatforms.includes(platform)}
//                 onChange={handlePlatformChange}
//               />
//               <label htmlFor={platform}>{platform}</label>
//             </div>
//           ))}
//           {error.plataformas && <span>{error.plataformas}</span>}
//         </div>

//         <div>
//           <label>Fecha de lanzamiento: </label>
//           <input
//             type="date"
//             name="fecha_de_lanzamiento"
//             value={input.fecha_de_lanzamiento}
//             onChange={handleChange}
//           />
//           {error.fecha_de_lanzamiento && <span>{error.fecha_de_lanzamiento}</span>}
//         </div>

//         <div>
//           <label>Género: </label>
//           {allGenres.map((genre) => (
//             <div key={genre.id}>
//               <input
//                 type="checkbox"
//                 name="genero"
//                 value={genre.nombre}
//                 checked={selectedGenres.includes(genre.nombre)}
//                 onChange={handleGenreChange}
//               />
//               <label htmlFor={genre.id}>{genre.nombre}</label>
//             </div>
//           ))}
//           {error.genero && <span>{error.genero}</span>}
//         </div>

//         <div>
//           <label>Rating: </label>
//           <input
//             type="number"
//             name="rating"
//             min="0"
//             max="5"
//             step="0.01"
//             value={input.rating}
//             onChange={handleChange}
//           />
//           {error.rating && <span>{error.rating}</span>}
//         </div>

//         <div>
//           <label>Imagen: </label>
//           <textarea
//             name="imagen"
//             placeholder="Ingresa la URL de la imagen"
//             value={input.imagen}
//             onChange={handleChange}
//             cols={50}
//             rows={1}
//           />
//           {error.imagen && <span>{error.imagen}</span>}
//         </div>

//         <div>
//           <label>Descripción: </label>
//           <textarea
//             name="descripcion"
//             placeholder="Ingresa la descripción del juego"
//             value={input.descripcion}
//             onChange={handleChange}
//             rows={10}
//             cols={50}
//           />
//           {error.descripcion && <span>{error.descripcion}</span>}
//         </div>

//         {isFormValid && (
//           <button type="submit" onClick={handleSubmit}>
//             SUBMIT
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Create;











//!_________________________________________

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createGame, getGenres } from "../../redux/actions/index";
// import "./create.styles.css";

// function Create() {
//   const dispatch = useDispatch();

//   const allGenres = useSelector((state) => state.allGenres);
  
//   const platforms = [
//     "PC",
//     "PlayStation",
//     "Xbox",
//     "Android",
//     "Apple Macintosh",
//     "Linux",
//     "Nintendo",
//     "iOS",
//     "Web",
//   ];

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: [],
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: 0,
//     imagen: "",
//     descripcion: "",
//   });

//   const [error, setError] = useState({
//     nombre: "*",
//     plataformas: ["*"],
//     fecha_de_lanzamiento: "*",
//     genero: ["*"],
//     rating: 0,
//     imagen: "*",
//     descripcion: "*",
//   });


//   const validate = (input) => {

//     const noEmpty = /([^\s])/
//     const URL = /^https?:\/\/[^ ]+\.(?:png|jpg|jpeg|gif|svg)(\?[^ ]*)?$/i;

//     if (!noEmpty.test(input.nombre)){
//       setError((prevError) => ({
//         ...prevError,
//         nombre: "Debe escribir un nombre",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         nombre: "",
//       }));
//     }

//     if (!URL.test(input.imagen)) {
//       setError((prevError) => ({
//         ...prevError,
//         imagen: "La URL de la imagen no es válida",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         imagen: "",
//       }));
//     }

//     if (!noEmpty.test(input.descripcion)){
//       setError((prevError) => ({
//         ...prevError,
//         descripcion: "Debe incluir una descripción del juego",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         descripcion: "",
//       }));
//     }

//     if (!input.plataformas.length){
//       setError((prevError) => ({
//         ...prevError,
//         plataformas: "Debe seleccionar al menos una plataforma",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         plataformas: [],
//       }));
//     }

//     if (!noEmpty.test(input.fecha_de_lanzamiento)){
//       setError((prevError) => ({
//         ...prevError,
//         fecha_de_lanzamiento: "Debe incluir una fecha de lanzamiento",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         fecha_de_lanzamiento: "",
//       }));
//     }

//     if (!input.genero.length){
//       setError((prevError) => ({
//         ...prevError,
//         genero: "Debe seleccionar al menos una plataforma",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         genero: [],
//       }));
//     }
//     if (input.rating === 0){
//       setError((prevError) => ({
//         ...prevError,
//         rating: "Debe seleccionar al menos una plataforma",
//       }));
//     } else {
//       setError((prevError) => ({
//         ...prevError,
//         rating: 0,
//       }));
//     }
    

//   };


  

//   function handleChange(e) {
//     const { name, value, checked } = e.target;

//     if (name === "genero") {
//       setInput((prevInput) => {
//         if (checked) {
//           return {
//             ...prevInput,
//             genero: [...prevInput.genero, value],
//           };
//         } else {
//           return {
//             ...prevInput,
//             genero: prevInput.genero.filter((genre) => genre !== value),
//           };
//         }
//       });
//     } else if (name === "rating") {
//       setInput((prevInput) => ({
//         ...prevInput,
//         rating: parseFloat(value),
//       }));
//     } else if (name === "plataformas") {
//       setInput((prevInput) => {
//         if (checked) {
//           return {
//             ...prevInput,
//             plataformas: [...prevInput.plataformas, value],
//           };
//         } else {
//           return {
//             ...prevInput,
//             plataformas: prevInput.plataformas.filter(
//               (platform) => platform !== value
//             ),
//           };
//         }
//       });
//     } else {
//       setInput((prevInput) => ({
//         ...prevInput,
//         [name]: value,
//       }));

//       validate({
//         ...input,
//         [name]: value,
//       });
//     }
//   }

//   function submitHandler(e) {
//     e.preventDefault();
//     dispatch(createGame(input));
//     setInput({
//       nombre: "",
//       plataformas: [],
//       fecha_de_lanzamiento: "",
//       genero: [],
//       rating: 0,
//       imagen: "",
//       descripcion: "",
//     })

//   }

//   return (
//     <div>
//       <form onSubmit={submitHandler}>
//         <div>
//           <label>Nombre: </label>
//           <input name="nombre" value={input.nombre} onChange={handleChange} />
//           <span className="error">{error.nombre}</span>
//         </div>

//         <div>
//           <label>Plataformas: </label>
//           {platforms.map((platform) => (
//             <div key={platform}>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="plataformas"
//                   value={platform}
//                   checked={input.plataformas.includes(platform)}
//                   onChange={handleChange}
//                 />
//                 {platform}
//               </label>
//             </div>
//           ))}
//           <span className="error">{error.plataformas}</span>
//         </div>

//         <div>
//           <label>Fecha de lanzamiento: </label>
//           <input
//             type="date"
//             name="fecha_de_lanzamiento"
//             value={input.fecha_de_lanzamiento}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Género: </label>
//           {allGenres.map((genre) => (
//             <div key={genre.id}>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="genero"
//                   value={genre.nombre}
//                   checked={input.genero.includes(genre.nombre)}
//                   onChange={handleChange}
//                 />
//                 {genre.nombre}
//               </label>
//             </div>
//           ))}
//         </div>

//         <div>
//           <label>Rating: </label>
//           <input
//             type="range"
//             name="rating"
//             min="0"
//             max="5"
//             step="0.01"
//             value={input.rating}
//             onChange={handleChange}
//           />
//           <div className="rating-label">{input.rating.toFixed(2)}</div>
//         </div>

//         <div>
//           <label>Imagen: </label>
//           <textarea
//             name="imagen"
//             placeholder="Ingresa la URL de la imágen"
//             value={input.imagen}
//             onChange={handleChange}
//             cols={50}
//             rows={1}
//           />
//           <span className="error">{error.imagen}</span>
//         </div>

//         <div>
//           <label>Descripción: </label>
//           <textarea
//             name="descripcion"
//             placeholder="Ingresa la descripción del juego"
//             value={input.descripcion}
//             onChange={handleChange}
//             rows={10}
//             cols={50}
//           />
//           <span className="error">{error.descripcion}</span>
//         </div>

//         {error.nombre || 
//         error.imagen || 
//         error.descripcion || 
//         error.fecha_de_lanzamiento ||
//         error.plataformas ||
//         error.genero ||
//         error.rating
//          ? null : <button type="submit">Submit</button>}
//       </form>
//     </div>
//   );
// }

// export default Create;


