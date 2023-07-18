
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres, getVideogames } from "../../redux/actions/index";
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
    } 
    
    
    else if (name === "rating") {
      setInput((prevInput) => ({
        ...prevInput,
        rating: parseFloat(value),
      }));
    } 
    
    
    else if (name === "plataformas") {
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
    } 
    
    
    else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  }


  function submitHandler(e) {
    e.preventDefault();
    dispatch(createGame(input));
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




//! __________________________________________________



// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createGame, getGenres, getVideogames } from "../../redux/actions/index";
// import "./create.styles.css";

// function Create() {
//   const dispatch = useDispatch();

//   const allGenres = useSelector((state) => state.allGenres);
//   const allPlatforms = useSelector((state) => state.allVideogames)

//   const platforms = Array.from(new Set(allPlatforms.map((item) => item.plataformas)));
//   console.log(platforms)

//   useEffect(() => {
//     dispatch(getVideogames());
//     dispatch(getGenres());
//   }, [dispatch]);

//   // PC | PlayStation | Xbox | Android | Apple Macintosh | Linux | Nintendo | iOS | Web 


//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: "",
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: 0,
//     imagen: "",
//     descripcion: "",
//   });

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
//     } else {
//       setInput((prevInput) => ({
//         ...prevInput,
//         [name]: value,
//       }));
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


//         {/* <div>
//           <label>Plataformas: </label>
//           {allPlatforms.map((game) => (
//             <div key={game.id}>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="genero"
//                   value={game.plataformas}
//                   checked={input.plataformas.includes(game.plataformas)}
//                   onChange={handleChange}
//                 />
//                 {game.plataformas}
//               </label>
//             </div>
//           ))}
//         </div> */}


//         <div>
//           <label>Plataformas: </label>
//           <input
//             name="plataformas"
//             value={input.plataformas}
//             onChange={handleChange}
//           />
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

//         {/* <div>
//           <label>Rating: </label>
//           <input name="rating" value={input.rating} onChange={handleChange} />
//         </div> */}

//         <div>
//           <label>Imagen: </label>
//           <textarea
//           name="imagen"
//           placeholder="Ingresa la URL de la imágen" 
//           value={input.imagen} 
//           onChange={handleChange}
//           cols={50} 
//           rows={1}
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

//! __________________________________________________

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createGame, getGenres, clearGenres } from "../../redux/actions/index";
// import "./create.styles.css";

// function Create() {

//   const dispatch = useDispatch();
//   const allGenres = useSelector((state) => state.allGenres);

//   useEffect(() => {
//     dispatch(getGenres());

//     return () => {
//       dispatch(clearGenres());
//     };
//   }, [dispatch]);

//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: "",
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: "",
//     imagen: "",
//     descripcion: "",
//   });

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
//     } else {
//       setInput((prevInput) => ({
//         ...prevInput,
//         [name]: value,
//       }));
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
//           <input
//             name="plataformas"
//             value={input.plataformas}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Fecha de lanzamiento: </label>
//           <input
//             name="fecha_de_lanzamiento"
//             value={input.fecha_de_lanzamiento}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Género: </label>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 name="genero"
//                 value="Action"
//                 checked={input.genero.includes("Action")}
//                 onChange={handleChange}
//               />
//               Action
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 name="genero"
//                 value="Platformer"
//                 checked={input.genero.includes("Platformer")}
//                 onChange={handleChange}
//               />
//               Platformer
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 name="genero"
//                 value="Fighting"
//                 checked={input.genero.includes("Fighting")}
//                 onChange={handleChange}
//               />
//               Fighting
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 name="genero"
//                 value="RPG"
//                 checked={input.genero.includes("RPG")}
//                 onChange={handleChange}
//               />
//               RPG
//             </label>
//           </div>
//         </div>

//         <div>
//           <label>Rating: </label>
//           <input name="rating" value={input.rating} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Imagen: </label>
//           <input name="imagen" value={input.imagen} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Descripción: </label>
//           <input
//             name="descripcion"
//             value={input.descripcion}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Create;

//! __________________________________________________

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createGame } from "../../redux/actions/index";
// import "./create.styles.css";

// function Create() {
//   const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: "",
//     fecha_de_lanzamiento: "",
//     genero: [],
//     rating: "",
//     imagen: "",
//     descripcion: "",
//   });

//   function handleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
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
//           <input name="nombre" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Plataformas: </label>
//           <input name="plataformas" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Fecha de lanzamiento: </label>
//            <input name="fecha_de_lanzamiento" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Genero: </label>
//           <input name="genero" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//            <label>Rating: </label>
//           <input name="rating" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Imagen: </label>
//           <input name="imagen" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Descripcion: </label>
//           <input name="descripcion" value={input.value} onChange={handleChange} />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Create;

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createGame } from "../../redux/actions/index"
// import axios from "axios";
// import "./create.styles.css";

// function Create() {

// const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     nombre: "",
//     plataformas: "",
//     fecha_de_lanzamiento: "",
//     genero: "",
//     rating: "",
//     imagen: "",
//     descripcion: "",
//   });

//   const [error, setError] = useState({
//     nombre: "*",
//     plataformas: "",
//     fecha_de_lanzamiento: "",
//     genero: "",
//     rating: "",
//     imagen: "",
//     descripcion: "",
//   });

//   const validate = (input) => {
//     // if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(input.nombre)) {
//     //   //! ESTA VALIDACION ES PARA MAILS ... ES SOLO UN EJEMPLO
//     //   setError({ ...error, nombre: "Formato invalido" });
//     //   return;
//     // }
//     setError({ ...error, nombre: "" });
//   };

//   function handleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });

//     validate({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function submitHandler(e) {

//     e.preventDefault()
//     await dispatch(createGame(input))

//   }
//   // axios.post("http://localhost:3001/videogame", input)
//   // .then(res=>alert(res))
//   // .catch(err=>alert(err))

//   return (
//     <div>
//       <form >
//         <div>
//           <label>Nombre: </label>
//           <input name="nombre" value={input.value} onChange={handleChange} />
//           <span> {error.nombre}</span>
//         </div>

//         <div>
//           <label>Plataformas: </label>
//           <input
//             name="plataformas"
//             value={input.value}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Fecha de lanzamiento: </label>
//           <input
//             name="fecha_de_lanzamiento"
//             value={input.value}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Genero: </label>
//           <input name="genero" value={input.value} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Rating: </label>
//           <input name="rating" value={input.value} onChange={handleChange} />
//         </div>

// <div>
//   <label>Imagen: </label>
//   <input name="imagen" value={input.value} onChange={handleChange} />
// </div>

// <div>
//   <label>Descripcion: </label>
//   <input
//     name="descripcion"
//     value={input.value}
//     onChange={handleChange}
//   />
// </div>

//       </form>
//       {error.nombre ? null : <button onClick={submitHandler} type="submit">Submit</button>}
//     </div>
//   );

// }

// export default Create;
