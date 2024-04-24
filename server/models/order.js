const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define('order', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true ,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Order;
