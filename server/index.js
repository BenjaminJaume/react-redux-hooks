const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const logger = require("morgan");
const cors = require("cors");
// const db = require("./models");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Answer API requests.
  require("./routes/auth.routes")(app);
  require("./routes/user.routes")(app);
  require("./routes/favoriteWords.routes")(app);

  (async () => {
    // const db = require("./models");
    // await db.sequelize.sync();
    // await db.user.sync({ force: true });
    // await db.usersFavoriteWords.sync({ force: true });
    // await db.favoriteWord.sync({ force: true });
    // // Defining the roles
    // const Role = db.role;
    // Role.create({
    //   id: 1,
    //   name: "user",
    // });
    // Role.create({
    //   id: 2,
    //   name: "moderator",
    // });
    // Role.create({
    //   id: 3,
    //   name: "admin",
    // });
  })();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
