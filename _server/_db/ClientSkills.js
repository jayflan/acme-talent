const Sequelize = require('sequelize');
const Client = require('./Client');
const { STRING } = Sequelize
const conn = require('./conn');

const ClientSkills = conn.define('clientSkills', {
  // skillName: {
  //   type: STRING,
  //   references: {
  //     model: Skill,
  //     key: 'id'
  //   }
  // }
});

module.exports = ClientSkills;
