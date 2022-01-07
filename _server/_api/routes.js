const router = require('express').Router() //<--remember ()!!!!!!
const { Client, Skill } = require('../_db').models

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
router.get('/:id', async(req, res, next) => {
  try {
    res.send(await Client.findByPk(req.params.id))
  } catch(err) {
    next(err)
  }
})
//DELETE skill from clientSkill join model
router.delete('/:id', async(req, res, next) => {
  try {
    // const skill = 
  } catch(err) {
    next(err)
  }
})

module.exports = router