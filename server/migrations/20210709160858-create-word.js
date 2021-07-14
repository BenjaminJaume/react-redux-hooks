"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Words", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Words");
  },
};
