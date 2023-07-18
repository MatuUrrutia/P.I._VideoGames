import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres } from "../../redux/actions/index";
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
    nombre: "",
    plataformas: [],
    fecha_de_lanzamiento: "",
    genero: [],
    rating: 0,
    imagen: "",
    descripcion: "",
  });


  const validate = (input) => {
    const regex = /^https?:\/\/[^ ]+\.(?:png|jpg|jpeg|gif|svg)(\?[^ ]*)?$/i;

    if (!regex.test(input.imagen)) {
      setError((prevError) => ({
        ...prevError,
        imagen: "La URL de la imagen no es válida",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        imagen: "",
      }));
    }
  };

  function handleChange(e) {
    const { name, value, checked } = e.target;

    if (name === "genero") {
      setInput((prevInput) => {
        if (checked) {
          return {
            ...prevInput,
            genero: [...prevInput.genero, value],
          };
        } else {
          return {
            ...prevInput,
            genero: prevInput.genero.filter((genre) => genre !== value),
          };
        }
      });
    } else if (name === "rating") {
      setInput((prevInput) => ({
        ...prevInput,
        rating: parseFloat(value),
      }));
    } else if (name === "plataformas") {
      setInput((prevInput) => {
        if (checked) {
          return {
            ...prevInput,
            plataformas: [...prevInput.plataformas, value],
          };
        } else {
          return {
            ...prevInput,
            plataformas: prevInput.plataformas.filter(
              (platform) => platform !== value
            ),
          };
        }
      });
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));

      validate({
        ...input,
        [name]: value,
      });
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(createGame(input));
    setInput({
      nombre: "",
      plataformas: [],
      fecha_de_lanzamiento: "",
      genero: [],
      rating: 0,
      imagen: "",
      descripcion: "",
    })
    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Nombre: </label>
          <input name="nombre" value={input.nombre} onChange={handleChange} />
        </div>

        <div>
          <label>Plataformas: </label>
          {platforms.map((platform) => (
            <div key={platform}>
              <label>
                <input
                  type="checkbox"
                  name="plataformas"
                  value={platform}
                  checked={input.plataformas.includes(platform)}
                  onChange={handleChange}
                />
                {platform}
              </label>
            </div>
          ))}
        </div>

        <div>
          <label>Fecha de lanzamiento: </label>
          <input
            type="date"
            name="fecha_de_lanzamiento"
            value={input.fecha_de_lanzamiento}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Género: </label>
          {allGenres.map((genre) => (
            <div key={genre.id}>
              <label>
                <input
                  type="checkbox"
                  name="genero"
                  value={genre.nombre}
                  checked={input.genero.includes(genre.nombre)}
                  onChange={handleChange}
                />
                {genre.nombre}
              </label>
            </div>
          ))}
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
          <div className="rating-label">{input.rating.toFixed(2)}</div>
        </div>

        <div>
          <label>Imagen: </label>
          <textarea
            name="imagen"
            placeholder="Ingresa la URL de la imágen"
            value={input.imagen}
            onChange={handleChange}
            cols={50}
            rows={1}
          />
          <span className="error">{error.imagen}</span>
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
        </div>

        <button type="submit">Submit</button>
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
//     nombre: "",
//     plataformas: [],
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: 0,
//     imagen: "",
//     descripcion: "",
//   });


//   const validate = (input) => {
//     const regex = /^https?:\/\/[^ ]+\.(?:png|jpg|jpeg|gif|svg)(\?[^ ]*)?$/i;

//     if (!regex.test(input.imagen)) {
//       setError("La URL de la imagen no es válida");
//     } else {
//       setError("");
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
//   }

//   return (
//     <div>
//       <form onSubmit={submitHandler}>
//         <div>
//           <label>Nombre: </label>
//           <input name="nombre" value={input.nombre} onChange={handleChange} />
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
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Create;


//!___________________________________________________



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
//     nombre: "",
//     plataformas: [],
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: 0,
//     imagen: "",
//     descripcion: "",
//   });

// const validate = (input) => {

//   //debe comprobar que todos los campos del form se han ingresado 

// //regex imagen URL  (http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))
// const regex = /^https?:\/\/[^ ]+\.(?:png|jpg|jpeg|gif|svg)(\?[^ ]*)?$/i;

// if (!regex.test(input.imagen)) {
//   return console.log("La URL de la imagen no es válida");
// } else {
//   return console.log("Todo OK");
// }

// }


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
//     } 
    
//     else if (name === "rating") {
//       setInput((prevInput) => ({
//         ...prevInput,
//         rating: parseFloat(value),
//       }));
//     } 
    
//     else if (name === "plataformas") {
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
//     } 
    
//     else {
//       setInput((prevInput) => ({
//         ...prevInput,
//         [name]: value,
//       }));

//       validate({
//         ...input,
//         [name]: value,
//       });
//     };


//   }


//   function submitHandler(e) {
//     e.preventDefault();
//     dispatch(createGame(input));
//   }


//   return (
//     <div>
//       <form onSubmit={submitHandler}>
//         <div>
//           <label>Nombre: </label>
//           <input name="nombre" value={input.nombre} onChange={handleChange} />
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
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Create;


//!_____________________________________________________

// let error = {};
// if (!form.name.trim()) {
//   error.name = 'Enter a correct name';
// } else if (form.name.length > 30) {
//   error.name = 'Name must be 30 characters or less';
// }
// if (!form.description.trim()) {
//   error.description = 'Enter a correct description';
// }
// if (!form.released.trim()) {
//   error.released = 'Enter a release date';
// } else {
//   const regex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!regex.test(form.released.trim())) {
//     error.released = 'You must enter in the format YYYY-MM-DD';
//   }
// }
// if (form.rating === ""  form.rating < 1  form.rating > 5) {
//   error.rating = "Enter a rating";
// }
// if (!/^https?://(?:www.)?\S+.(?:jpg|jpeg|png|gif)$/i.test(form.image)) {
//   error.image = 'Invalid image';
// }
// if (!form.genres.length) {
//   error.genres = "Select one or more genres";
// }
// if (!form.platforms.length) {
//   error.platforms = "Select one or more platforms";
// }
// return error;
// }