"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_words.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      users_words.belongsTo(models.Word, {
        foreignKey: "WordId",
      });
    }
  }
  users_words.init(
    {
      UserId: DataTypes.INTEGER,
      WordId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_words",
    }
  );
  return users_words;
};
