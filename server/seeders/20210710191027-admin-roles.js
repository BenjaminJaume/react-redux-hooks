"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_roles", [
      {
        // userId: 1 = Administrator
        userId: 1,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // userId: 2 = Moderator
        userId: 2,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_roles", {
      userId: {
        // userId: 1 = Administrator
        // userId: 2 = Moderator
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
