const sequelize = require("../util/db");
const { DataTypes, Sequelize } = require("sequelize");

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
     premium: {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = User;
