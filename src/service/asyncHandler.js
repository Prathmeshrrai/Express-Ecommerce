const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const statusCode = Number(error.code) || 500;  // ✅ Always convert to number

    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  });
};

export default asyncHandler;
