"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_favoritewords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_favoritewords.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      users_favoritewords.belongsTo(models.FavoriteWord, {
        foreignKey: "FavoriteWordId",
      });
    }
  }
  users_favoritewords.init(
    {
      UserId: DataTypes.INTEGER,
      FavoriteWordId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_favoritewords",
    }
  );
  return users_favoritewords;
};
