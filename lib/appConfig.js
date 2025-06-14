// eslint-disable-next-line no-undef
exports.handleError = async (err, req, res, next) => {
    if (!err) {
      return next();
    }
    const errorResponse = {
      error: true,
      message: err.stack, ...(err.output && err.output.payload ? err.output.payload : err),
    };
    console.log('Error stack :: ');
    console.log(err.stack);
  
    const statusCode = err.output && err.output.statusCode ? err.output.statusCode : 500;
    return res.status(statusCode).json(errorResponse);
  };