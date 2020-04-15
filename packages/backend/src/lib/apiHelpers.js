export function asyncHandlerWrapper(middleware) {
  if (middleware.length === 4) {
    return function wrappedHandler(error, req, res, next) {
      middleware(error, req, res, next).catch(next);
    };
  }
  return function wrappedHandler(req, res, next) {
    middleware(req, res, next).catch(next);
  };
}
