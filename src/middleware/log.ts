import { NextFunction, Request, Response } from 'express'

const logMiddleware = (req: Request, _: Response, next: NextFunction): void => {
  const header = req.headers
  const userAgent = header['user-agent']
  next()
}

export { logMiddleware }
