"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/db.config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Many users can have many role
db.Role.belongsToMany(db.User, {
  through: "users_roles",
  foreignKey: "RoleId",
  otherKey: "UserId",
});
db.User.belongsToMany(db.Role, {
  through: "users_roles",
  foreignKey: "UserId",
  otherKey: "RoleId",
});

// Many users can have many favorite words
db.Word.belongsToMany(db.User, {
  through: "users_words",
  foreignKey: "WordId",
  otherKey: "UserId",
});
db.User.belongsToMany(db.Word, {
  through: "users_words",
  foreignKey: "UserId",
  otherKey: "WordId",
});

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
