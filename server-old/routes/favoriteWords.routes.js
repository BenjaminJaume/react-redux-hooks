const favoriteWordsController = require("../controllers").favoriteWords;

module.exports = (app) => {
  app.get("/api/get-favorites/:userId", favoriteWordsController.listAll);

  app.post("/api/create-word", favoriteWordsController.create);

  app.post("/api/remove-word/:wordId", favoriteWordsController.remove);

  // app.get("/api/list", favoriteWordsController.list);

  //   app.put("/api/todos/:todoId", todosController.update);

  //   app.delete("/api/todos/:todoId", todosController.destroy);

  //   app.post("/api/todos/:todoId/items", todoItemsController.create);

  //   app.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);

  //   app.delete(
  //     "/api/todos/:todoId/items/:todoItemId",
  //     todoItemsController.destroy
  //   );

  //   // For any other request method on todo items, we're going to return "Method Not Allowed"
  //   app.all("/api/todos/:todoId/items", (req, res) =>
  //     res.status(405).send({
  //       message: "Method Not Allowed",
  //     })
  //   );
};
