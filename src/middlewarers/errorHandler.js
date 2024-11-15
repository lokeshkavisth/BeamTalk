const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  return res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandler;
