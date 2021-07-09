"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const isDev = process.env.NODE_ENV !== "production";
const config = require(__dirname + "/../config/db.config.js")[env];
const db = {};

let sequelize;
if (isDev) {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
} else {
  if (config.url) {
    sequelize = new Sequelize(config.url, config);
  } else {
    console.error("Please include the dabatase URL in the '.env' file");
  }
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

db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.favoriteWord = require("./favoriteWord.js")(sequelize, Sequelize);
db.usersRoles = require("./usersRoles.js")(sequelize, Sequelize);
db.usersFavoriteWords = require("./usersFavoriteWords.js")(
  sequelize,
  Sequelize
);

// Definition tables' relationships
// Many users can have many role
db.role.belongsToMany(db.user, {
  through: "users_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "users_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// Many users can have many favorite words

// End definition tables' relationships

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
