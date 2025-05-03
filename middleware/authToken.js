const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(AppError.error(401, "failed", "Unauthorized"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        const errorMessage = err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";

        const error = AppError.error(401, "failed", errorMessage);

        return next(error);
    }
}

module.exports = authToken;