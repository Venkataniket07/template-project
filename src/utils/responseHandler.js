const responseHandler = (req, res, next) => {
  res.success = (data, success = true, statusCode = 200) => {
    res.status(statusCode).json({
      success,
      data,
    });
  };

  res.error = (error, statusCode = 500) => {
    const errorMessage = error.message || "An unexpected error occurred";
    const errorDetails = error.details || null;

    res.status(statusCode).json({
      status: "error",
      message: errorMessage,
      details: errorDetails,
    });
  };

  next();
};

module.exports = responseHandler;
