import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authorizationAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<NextFunction | Response> {
  try {
    const { authorization } = req.headers;

    if (authorization === undefined || authorization === null) {
      return res.status(401).send({
        status_code: 401,
        results: {},
        errors: ['Authorization token is required'],
      });
    }

    const authorizationArr = authorization.split(' ');

    if (authorizationArr.length !== 2 && authorizationArr[0] !== 'Bearer') {
      return res.status(401).send({
        status_code: 401,
        results: {},
        errors: ['Authorization token is invalid'],
      });
    }

    jwt.verify(
      authorizationArr[1],
      process.env.JWT_ACCESS_TOKEN_SECRET,
      async (err, decoded: { adminId: string }) => {
        if (err) {
          return res.status(401).send({
            status_code: 401,
            results: {},
            errors: [err],
          });
        }
      },
    );
  } catch (err) {
    return res.status(401).send({
      status_code: 401,
      results: {},
      errors: [err],
    });
  }

  next();
}
