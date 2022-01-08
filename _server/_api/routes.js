const router = require('express').Router() //<--remember ()!!!!!!
const { Client, Skill, ClientSkill } = require('../_db').models
//GET all data from Client with Skill association
router.get('/clients', async(req, res, next) => {
  try {
    const data = await Client.findAll({
      include: [
        {
          model: Skill
        }
      ]
    });
    res.send(data);
  }
  catch(err) {
    next(err);
  }
})
//Get all data from Skill model with Client association
router.get('/skills', async(req, res, next) => {
  try {
    const data = await Skill.findAll({
      include: [
        {
          model: Client
        }
      ]
    })
    res.send(data);
  }
  catch(err) {
    next(err);
  }
})

//GET single client id for client page
router.get('/client/:id', async(req, res, next) => {
  try {
    res.send(await Client.findByPk(req.params.id))
  } catch(err) {
    next(err)
  }
})
//GET all clientSkills 
router.get('/clientskills', async(req, res, next) => {
  try {
    const clientSkills = await ClientSkill.findAll() 
    res.send(clientSkills)
  } catch(err) {
    next(err)
  }
})
//DELETE skill from clientSkill join model using clientSkills.id
router.delete('/:id', async(req, res, next) => {
  try {
    const skill = await ClientSkill.findByPk(req.params.id)
    await skill.destroy()
    res.send(skill);
  } catch(err) {
    next(err)
  }
})

module.exports = router