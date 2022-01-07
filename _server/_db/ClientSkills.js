const Sequelize = require('sequelize')
const { INTEGER } = Sequelize
const conn = require('./conn');

const ClientSkill = conn.define('clientSkills', {
  // clientSkillId: INTEGER
  // id: {
  //   type: INTEGER,
  //   primaryKey: true
  // }
});

module.exports = ClientSkill;
