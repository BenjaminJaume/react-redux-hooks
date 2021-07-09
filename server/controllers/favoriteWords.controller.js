const db = require("../models");

const Op = db.Sequelize.Op;

module.exports = {
  create(req, res) {
    const { word, language, partOfSpeech, definition, example, userId } =
      req.body;
    return db.FavoriteWord.create({
      word: word,
      language: language,
      partOfSpeech: partOfSpeech,
      definition: definition,
      example: example,
    })
      .then((response) => {
        db.users_favoritewords
          .create(
            {
              UserId: userId,
              FavoriteWordId: response.id,
            },
            { fields: ["UserId", "FavoriteWordId"] }
          )
          .then((response) => {
            // console.log(response);
            res.status(201).send(response);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send(error);
      });
  },

  remove(req, res) {
    // console.log(req.params.wordId, req.body.userId);
    const { userId } = req.body;
    const { wordId } = req.params;

    return db.users_favoritewords
      .destroy({
        where: {
          UserId: userId,
          FavoriteWordId: wordId,
        },
      })
      .then(() => {
        db.FavoriteWord.destroy({
          where: {
            id: wordId,
          },
        })
          .then((response) => {
            // console.log(response);
            res.sendStatus(200).send(response);
          })
          .catch((error) => {
            // console.log(error);
            res.sendStatus(400).send(error);
          });
      })
      .catch((error) => {
        // console.log(error);
        res.sendStatus(400).send(error);
      });
  },

  listAll(req, res) {
    return db.users_favoritewords
      .findAll({
        where: {
          UserId: req.params.userId,
        },
        include: [
          {
            model: db.FavoriteWord,
            attributes: {
              exclude: ["createdAt", "password", "updatedAt"],
            },
          },
        ],
      })
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
