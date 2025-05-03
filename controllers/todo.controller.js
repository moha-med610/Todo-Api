const Todo = require("../models/todos");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");

const getTodos = asyncHandler(async (req, res, next) => {
    const todos = await Todo.find({ user: req.user.id });

    if(todos.length === 0){
        return next(AppError.error(404, "failed", "You Don't Have A Todos"))
    }

    res.status(200).json({
        success: true,
        status: 200,
        message: "Get all done!",
        data: todos
    })

})

const getTodo = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if(!todo){
        return next(AppError.error(404, "failed", "Not Found"));
    }

    res.status(200).json({
        success: true,
        status: 200,
        message: "Get single Todo Successfully!",
        data: todo,
    })

})

const createTodo = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;

    if (!title || title.trim() === '' || !description ||description.trim() === '') {
        return next(AppError.error(400, "failed", "All Fields are required"));
    }

    const todo = await Todo.create({
        title,
        description,
        user: req.user.id,
    })

    res.status(201).json({
        success: true,
        status: 201,
        message: "Created Successfully",
        data: todo
    })
})

const editTodo = asyncHandler(async (req,res, next) => {
    const id = req.params.id;
    const { title, description ,completed } = req.body;

    const todo = await Todo.findOne({ _id: id, user: req.user.id })

    if(!todo){
        return next(AppError.error(404, "failed", "Todo Not Found"));
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    if (description !== undefined) todo.description = description

    const updatedTodo = await todo.save();

    res.status(200).json({
        success: true,
        status: 200,
        message: "Updated Successfully",
        data: updatedTodo
    })
})

const deleteTodo = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const todo = await Todo.findOne({ _id: id, user: req.user.id });

    if (!todo) {
        return next(AppError.error(404, "failed", "Todo Not Found"));
    }

    await todo.deleteOne();

    res.status(200).json({
        success: true,
        status: 200,
        message: "Deleted Successfully",
        data: null
    })
})


module.exports = {
    getTodos,
    getTodo,
    createTodo,
    editTodo,
    deleteTodo
}