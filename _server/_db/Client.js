const Sequelize = require('sequelize')
const { STRING } = Sequelize
const conn = require('./conn')

const Client = conn.define('clients', {
  clientName: {
    type: STRING,
    allowNull: false
  }
});

module.exports = Client;
