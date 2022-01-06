const app = require('./app')
const db = require('./_db')
const PORT = process.env.PORT || 5000

const init = async() => {
  //REMEMBER!!: Need to use syncAndSeed on proto
    //so now unhandled promise/non func error!!!
  await db.syncAndSeed(),
  app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
}

init();