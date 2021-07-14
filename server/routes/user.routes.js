const { authJwt } = require("../middleware");
const userController = require("../controllers").user;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", userController.allAccess);

  app.get("/api/user", [authJwt.verifyToken], userController.userBoard);

  app.get(
    "/api/modo",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  app.put("/api/user/change-email", userController.changeEmail);
};
