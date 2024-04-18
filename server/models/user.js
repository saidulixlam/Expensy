const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

 const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

 module.exports = User;