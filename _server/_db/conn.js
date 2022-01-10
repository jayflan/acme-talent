const Sequelize = require('sequelize');
const fs = require('fs');

//go to this AWS page to download ssl certs for heroku deployment ssl:
  //https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html
  //place cert in same folder as this conn file

let conn = '';

if(process.env.DATABASE_URL) {
    conn = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {  
              require: true,
              ca: fs.readFileSync(`${__dirname}/us-east-1-bundle.pem`),
              //reject line used with heroku due to getting self cert error
              //reject line also works without ssl for heroku, though less secure?
              rejectUnauthorized: false
            }
        }
    })
} else {
        conn = new Sequelize('postgres://postgres:Bigman<26@localhost:5432/acme-talent')
}

module.exports = conn;

