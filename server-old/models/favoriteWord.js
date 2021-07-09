module.exports = (sequelize, Sequelize) => {
  const FavoriteWord = sequelize.define("favorite_word", {
    word: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    language: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    partOfSpeech: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    definition: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    example: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
  });

  FavoriteWord.associate = (models) => {
    FavoriteWord.belongsToMany(models.users, {
      through: models.users_favorite_words,
      foreignKey: "id",
      onDelete: "CASDADE",
    });
  };

  return FavoriteWord;
};
