export const responseHandler = (req, res, next) => {
  res.success = (
    statusCode = 200,
    data = null,
    message = "Request was successful"
  ) => {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };

  res.error = (statusCode = 400, message = "Something went wrong") => {
    res.status(statusCode).json({
      status: "error",
      message,
    });
  };

  next();
};
