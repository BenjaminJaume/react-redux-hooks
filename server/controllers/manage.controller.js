const db = require("../models");

module.exports = {
  listAll(req, res) {
    return db.User.findAll()
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(error);
      });
  },
};
