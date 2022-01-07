const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { Client, Skill, ClientSkills } = require('./_db').models
// const db = require('./_db');
// const { Client, Skill, ClientSkills } = require ('./_db/index').models;

//middleware
app.use(morgan('dev'));

// app.use(express.json) <--turned off until confirmed needed 

//paths
app.use(express.static(path.join(__dirname, '..', '_public')))
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))


//rounter/api path
app.use('/api', require('./_api'))

//primary index.html get
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', '_client', 'index.html')))

//api testing & final setup
// app.get('/api/clientskill', async(req, res)=> {
//   try {
//     const data = await ClientSkills.findAll();
//     console.log(data);
//     res.send(data);
//   }
//   catch(err) {
//     console.log(err);
//   }
// })


//error handling
app.use((req, res, next) => {
  const error = Error('Page not found')
  error.status(404)
  next(error)
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app;
