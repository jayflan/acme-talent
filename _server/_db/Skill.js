const Sequelize = require('sequelize')
const { STRING } = Sequelize
const conn = require('./conn')

const Skill = conn.define('skills', { 
    skillName: {
      type: STRING,
      allowNull: false
    }
});

module.exports = Skill;