const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const Expense = sequelize.define("expense", {
  amount: {
    type: DataTypes.FLOAT, // or DataTypes.DECIMAL
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
