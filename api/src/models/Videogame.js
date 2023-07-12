const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    plataformas:  {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo "plataformas" debe tener al menos un elemento',
        },
      },
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      isUrl: true,
    },
    fecha_de_lanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0,
      
    },
    genero: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo "genero" debe tener al menos un elemento',
        },
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
   }, { timestamps: false }
  );
};
