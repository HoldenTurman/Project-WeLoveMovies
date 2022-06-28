//Function that creates default error incase things don't read.
//Import this to all controllers

function asyncErrorBoundary(delegate, defaultState) {
  return(request, response, next) => {
    Promise.resolve()
    .then(() => delegate(request, response, next))
    .catch((error = {}) => {
      const { status = defaultState, message = error } = error;
      next({
        status,
        message,
      });
    });
  };
};

module.exports = asyncErrorBoundary;