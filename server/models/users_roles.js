"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_roles.belongsTo(models.User, {
        foreignKey: "userId",
      });
      users_roles.belongsTo(models.Role, {
        foreignKey: "RoleId",
      });
    }
  }
  users_roles.init(
    {
      userId: DataTypes.INTEGER,
      RoleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_roles",
    }
  );
  return users_roles;
};
