const db = require("../models");

const Op = db.Sequelize.Op;

module.exports = {
  create(req, res) {
    const { word, language, partOfSpeech, definition, example, userId } =
      req.body;
    return db.favorite_word
      .create({
        word: word,
        language: language,
        partOfSpeech: partOfSpeech,
        definition: definition,
        example: example,
      })
      .then((response) => {
        db.users_favorite_words
          .create(
            {
              user_id: userId,
              favorite_word_id: response.id,
            },
            { fields: ["user_id", "favorite_word_id"] }
          )
          .then((response) => {
            // console.log(response);
            res.status(201).send(response);
          })
          .catch((error) => {
            // console.log(error);
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

    return db.users_favorite_words
      .destroy({
        where: {
          user_id: userId,
          favorite_word_id: wordId,
        },
      })
      .then(() => {
        db.favorite_word
          .destroy({
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

    // .then((response) => {
    //   db.users_favorite_words
    //     .create(
    //       {
    //         user_id: req.body.userId,
    //         favorite_word_id: response.id,
    //       },
    //       { fields: ["user_id", "favorite_word_id"] }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       res.status(201).send(response);
    //     })
    //     .catch((error) => {
    //       // console.log(error);
    //       res.status(400).send(error);
    //     });
    // })
    // .catch((error) => {
    //   // console.log(error);
    //   res.status(400).send(error);
    // });
  },

  listAll(req, res) {
    return db.users_favorite_words
      .findAll({
        where: {
          user_id: req.params.userId,
        },
        include: [
          {
            model: db.favorite_word,
            attributes: {
              exclude: ["createdAt", "password", "updatedAt"],
            },
          },
        ],
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => res.status(400).json(error));
  },
  // listAll(req, res) {
  //   return usersFavoriteWords.findAll({ include: user }).then((response) => {
  //     res.status(200).send(response);
  //   });
  // listAll(req, res) {
  //   return favoriteWord.create({
  //     word: req.body.word,
  //     partOfSpeech: req.body.partOfSpeech,
  //     definition: req.body.definition,
  //     example: req.body.example,
  //     userId: req.params.userId,
  //   });
  // },
  //   return usersFavoriteWords
  //     .findByPk({ where: { userId: req.params.userId } })
  //     .then((response) => {
  //       res.status(200).send(response);
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
  // update(req, res) {
  //   return Todo.findByPk(req.params.todoId, {
  //     include: [
  //       {
  //         model: TodoItem,
  //         as: "todoItems",
  //       },
  //     ],
  //   })
  //     .then((todo) => {
  //       if (!todo) {
  //         return res.status(404).send({
  //           message: "Todo Not Found",
  //         });
  //       }
  //       return todo
  //         .update({
  //           title: req.body.title || todo.title,
  //         })
  //         .then(() => res.status(200).send(todo)) // Send back the updated todo.
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
  // destroy(req, res) {
  //   return Todo.findByPk(req.params.todoId)
  //     .then((todo) => {
  //       if (!todo) {
  //         return res.status(400).send({
  //           message: "Todo Not Found",
  //         });
  //       }
  //       return todo
  //         .destroy()
  //         .then(() =>
  //           res.status(200).send({ message: "Todo deleted successfully." })
  //         )
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
};
