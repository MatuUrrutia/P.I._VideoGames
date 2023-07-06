const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('genre', {
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
     }, { timestamps: false }
    );
  };
  