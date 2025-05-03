const express = require("express");
const authToken = require("../middleware/authToken");
const controllers = require("../controllers/todo.controller");

const router = express.Router();

router.route("/")
    .get(authToken, controllers.getTodos)
    .post(authToken, controllers.createTodo)

router.route("/:id")
    .get(authToken, controllers.getTodo)
    .patch(authToken, controllers.editTodo)
    .put(authToken, controllers.editTodo)
    .delete(authToken, controllers.deleteTodo);

module.exports = router;