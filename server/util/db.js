const Sequelize = require('sequelize');
const sequelize =new Sequelize('expense-tracker','root','Saidul@24',{
    dialect:'mysql',
    body:'localhost'
});

module.exports = sequelize;