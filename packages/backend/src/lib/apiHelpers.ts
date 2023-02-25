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
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction, // 4 args required to id this as an error handler
) => {
  let msg = error instanceof Error ? error.message : error;
  msg ??= 'Unknown Error';
  console.error(`Middleware Error: ${msg}`);
  res.status(500).send(msg);
};
