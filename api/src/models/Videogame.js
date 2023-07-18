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
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    plataformas:  {
      type: DataTypes.ARRAY(DataTypes.STRING),
      
    },
    imagen: {
      type: DataTypes.STRING,

    },
    fecha_de_lanzamiento: {
      type: DataTypes.DATEONLY,

    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      
    },
    genero: {
      type: DataTypes.ARRAY(DataTypes.STRING),

    },
    descripcion: {
      type: DataTypes.TEXT,

    },
    creado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,

    },
    
   }, { timestamps: false }
  );
};
