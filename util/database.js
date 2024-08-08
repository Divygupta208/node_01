const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Dg@132000", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
