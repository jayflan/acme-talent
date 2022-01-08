const Sequelize = require('sequelize')
const { INTEGER } = Sequelize
const conn = require('./conn');

const ClientSkill = conn.define('clientSkills', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = ClientSkill;
