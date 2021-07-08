module.exports = function (sequelize, Sequelize) {
  const UsersFavoriteWords = sequelize.define(
    "users_favorite_words",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique-user-per-favorite-word",
      },
      favorite_word_id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: "favorite_words",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique-user-per-favorite-word",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "users_favorite_words",
    }
  );

  UsersFavoriteWords.associate = (models) => {
    UsersFavoriteWords.belongsToMany(models.users, {
      foreignKey: "id",
      targetKey: "id",
      through: "users_favorite_words",
      onDelete: "CASDADE",
    });
    UsersFavoriteWords.belongsToMany(models.favorite_word, {
      foreignKey: "id",
      targetKey: "id",
      through: "users_favorite_words",
      onDelete: "CASDADE",
    });
  };

  return UsersFavoriteWords;
};
