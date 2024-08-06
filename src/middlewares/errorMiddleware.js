// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Determine the status code; default to 500 if it's not set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send the response with the status code and error details
  res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Not found middleware
const notFound = (req, res, next) => {
  // Create a new error with the correct message format
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404); // Set the status code
  next(error); // Pass the error to the next middleware
};

module.exports = { errorHandler, notFound };
