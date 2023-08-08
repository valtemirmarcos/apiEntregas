'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';

const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
// alteracao para puxar direto do env
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
const nconfig = process.env;

// console.log("info env:");
// console.log( process.env);
if(env=='production'){
  console.log( process.env.USERNAME);
  sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    dialect:process.env.DIALECT,
    host: process.env.HOST,
    timezone: process.env.TIMEZONE,
  });
}else{
  console.log( process.env.TEST_USERNAME);
  sequelize = new Sequelize(process.env.TEST_DATABASE, process.env.TEST_USERNAME, process.env.TEST_PASSWORD, {
    dialect:process.env.TEST_DIALECT,
    host: process.env.TEST_HOST,
    timezone: process.env.TEST_TIMEZONE,
  });
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
