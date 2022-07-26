const pathNotFoundRouters = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    res.send(error.message)
};

module.exports = pathNotFoundRouters;
