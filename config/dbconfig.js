const Sequelize = require('sequelize');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: Sequelize.Op
  },
  test: {
    dialect: 'sqlite',
    storage: 'testdb',
    operatorsAliases: Sequelize.Op
  }
};
