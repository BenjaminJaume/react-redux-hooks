module.exports = (sequelize, Sequelize) => {
  const UsersRoles = sequelize.define("users_roles", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.INTEGER,
    },
  });

  return UsersRoles;
};
