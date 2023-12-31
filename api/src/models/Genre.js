const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('genre', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     }, { timestamps: false }
    );
  };
  