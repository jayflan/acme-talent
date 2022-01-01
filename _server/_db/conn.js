const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:Bigman<26@localhost:5432/acme-talent');

module.exports = conn;

