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

module.exports = router