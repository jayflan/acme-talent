const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//middleware
app.use(morgan('dev'));

// app.use(express.json) <--turned off until confirmed needed 

//paths
app.use(express.static(path.join(__dirname, '..', '_public')))
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))
//rounter/api path
// app.use('api', require('./_api')) <--turned off until api test complete

//primary index.html get
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', '_client', 'index.html')))

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
