import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

type AsyncErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const asyncHandlerWrapper = (
  middleware: AsyncRequestHandler | AsyncErrorRequestHandler,
): RequestHandler | ErrorRequestHandler => {
  if (middleware.length === 4) {
    return function wrappedHandler(
      error: Error,
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      (middleware as AsyncErrorRequestHandler)(error, req, res, next).catch(
        next,
      );
    };
  }
  return function wrappedHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    (middleware as AsyncRequestHandler)(req, res, next).catch(next);
  };
};

export const errorMiddleware: ErrorRequestHandler = (
  error: any,
  _req: Request,
  res: Response,
) => {
  console.error('Middleware Error', Object.keys(error));
  res.status(500).send('Unexpected error');
};
