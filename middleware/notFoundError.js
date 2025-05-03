
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `The ${req.path} is not found.`,
        data: null,
    })
}

module.exports = notFoundHandler;