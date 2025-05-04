// packages
const express = require("express")
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");

// Start server
const server = require("./config/server")

// Global Errors
const notFound = require("./middleware/notFoundError");
const globalError = require("./middleware/globalError");

// routes
const usersRouter = require("./routes/users.routes");
const todoRouter = require("./routes/todo.routes")

// app
const app = express();




app.use(cors({
    origin: process.env.CORS,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// routes
app.use("/api/auth", usersRouter);
app.use("/api/todos", todoRouter)


// ErrorHandler
app.use(notFound)
app.use(globalError)

// connect the server and dataBase
server(app)




