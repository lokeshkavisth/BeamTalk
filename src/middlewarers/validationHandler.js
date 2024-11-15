export const validationHandler = (schema, location = "body") => {
  return (req, res, next) => {
    let dataToValidate;

    switch (location) {
      case "body":
        dataToValidate = req.body;
        break;
      case "query":
        dataToValidate = req.query;
        break;
      case "params":
        dataToValidate = req.params;
        break;
      default:
        dataToValidate = req.body;
    }

    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        message: "Input validation failed",
        errors: errors,
      });
    }

    next();
  };
};
