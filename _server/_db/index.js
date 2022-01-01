const conn = require('./conn')
const Client = require('./Client')
const Skill = require('./Skill')

//db/table relationships
Skill.belongsTo(Client);
Client.hasMany(Skill);

const syncAndSeed = async() => {
  await conn.sync({ force: true })

  const clientList = ['Moe', 'Larry', 'Curly', 'Lucy', 'Ethyl'];
  await Promise.all(clientList.map(name => Client.create({clientName: name})))
  
  const skillList = ['singing', 'dancing', 'acting', 'juggling', 'plate spinning', 'long division']
  await Promise.all(skillList.map(name => Skill.create({skillName: name})))
}

module.exports = {
  syncAndSeed,
  models: {
    Client,
    Skill
  }
}