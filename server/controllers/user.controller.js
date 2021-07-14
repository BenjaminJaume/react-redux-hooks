const db = require("../models");

module.exports = {
  allAccess(req, res) {
    res.status(200).send("Public Content.");
  },

  userBoard(req, res) {
    res.status(200).send("User Content.");
  },

  adminBoard(req, res) {
    res.status(200).send("Admin Content.");
  },

  moderatorBoard(req, res) {
    res.status(200).send("Moderator Content.");
  },

  changeEmail(req, res) {
    const { userId: id, email } = req.body;
    return db.User.update(
      { email },
      {
        where: {
          id,
        },
      }
    )
      .then((response) => {
        // console.log(error);
        res.status(200).send("Success from server");
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(error);
      });
  },
};
