// packages
const express = require("express")
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_LOCAL_URL,
];

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter)

// routes
app.use("/api/auth", usersRouter);
app.use("/api/todos", todoRouter)


// ErrorHandler
app.use(notFound)
app.use(globalError)

// connect the server and dataBase
server(app)




