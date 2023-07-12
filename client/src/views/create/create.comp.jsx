import { useState } from 'react';
import './create.styles.css';

function Create() {

  const [input, setInput] = useState({

    nombre: "",
    plataformas: "",
    fecha_de_lanzamiento: "",
    genero: "",
    rating: "",
    imagen: "",
    descripcion: "",
  })

  
  const [error, setError] = useState({

    nombre: "*",
    plataformas: "",
    fecha_de_lanzamiento: "",
    genero: "",
    rating: "",
    imagen: "",
    descripcion: "",
  })

  const validate = (input) => {
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(input.nombre)) { //! ESTA VALIDACION ES PARA MAILS ... ES SOLO UN EJEMPLO
      setError({...error, nombre: "Formato invalido"});
      return;
  }
  setError({...error, nombre: ""})
}

  function handleChange(e) {

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    validate({
      ...input,
      [e.target.name]: e.target.value,
    })
  }


  return (
    <div>
     
     <form onSubmit={""}>

        <div>
          <label>Nombre</label>
          <input name="nombre" value={input.value} onChange={handleChange}/>
          <span> {error.nombre}</span>
        </div>

        <div>
          <label>Plataformas</label>
          <input name="plataformas" value={input.value} onChange={handleChange}/>
        </div>

        <div>
          <label>Fecha de lanzamiento</label>
          <input name="fecha_de_lanzamiento" value={input.value} onChange={handleChange}/>
        </div>

        <div>
          <label>Genero</label>
          <input name="genero" value={input.value} onChange={handleChange}/>
        </div>

        <div>
          <label>Rating</label>
          <input name="rating" value={input.value} onChange={handleChange}/>
        </div>

        <div>
          <label>Imagen</label>
          <input name="imagen" value={input.value} onChange={handleChange}/>
        </div>

        <div>
          <label>Descripcion</label>
          <input name="descripcion" value={input.value} onChange={handleChange}/>
        </div>

      
     </form>
      {error.nombre ? null: <button type="submit">Submit</button>}

    </div>
  );
}

export default Create;