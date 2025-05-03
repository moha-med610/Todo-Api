module.exports = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        statsMessage: err.statusMessage || "error",
        message: err.message || "Internal Server Error",
        data: null,
    });
};