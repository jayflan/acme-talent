const conn = require('./conn')
const Client = require('./Client')
const Skill = require('./Skill')
const ClientSkill = require('./ClientSkills')

//db/table relationships
Client.belongsToMany(Skill, { through: ClientSkill})
Skill.belongsToMany(Client, { through: ClientSkill})

const syncAndSeed = async() => {
  try {
    await conn.sync({ force: true })
  
    const [moe, larry, curly, lucy, ethyl] = await Promise.all(
      ['Moe', 'Larry', 'Curly', 'Lucy', 'Ethyl'].map(name => Client.create({ clientName: name })))
  
    const [singing, dancing, acting, juggling, plate_spinning, long_division] = await Promise.all(
      ['singing', 'dancing', 'acting', 'juggling', 'plate spinning', 'long division'].map(name => Skill.create({ skillName: name })))
    
    //Remember!!!: This is how you create manyToMany entries!!!:
    moe.addSkill(singing)
    moe.addSkill(juggling)
    moe.addSkill(plate_spinning)
    lucy.addSkill(singing)
    lucy.addSkill(dancing)
  }
  catch(err) {
    console.log('db sync issue!!!!')
  }
}

module.exports = {
  syncAndSeed,
  models: {
    Client,
    Skill,
    ClientSkill
  }
}