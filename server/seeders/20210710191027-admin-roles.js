"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_roles", [
      {
        // UserId: 1 = Administrator
        UserId: 1,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // UserId: 2 = Moderator
        UserId: 2,
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users_roles", {
      UserId: {
        // UserId: 1 = Administrator
        // UserId: 2 = Moderator
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
