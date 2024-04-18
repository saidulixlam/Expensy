const Sequelize = require('sequelize');
const sequelize =new Sequelize('node-complete','root','Saidul@24',{
    dialect:'mysql',
    body:'localhost'
});

module.exports = sequelize;