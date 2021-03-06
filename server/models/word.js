"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Word.belongsToMany(models.User, {
        foreignKey: "UserdId",
        through: "users_words",
      });
    }
  }
  Word.init(
    {
      word: DataTypes.STRING,
      language: DataTypes.STRING,
      partOfSpeech: DataTypes.STRING,
      definition: DataTypes.STRING,
      example: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};
