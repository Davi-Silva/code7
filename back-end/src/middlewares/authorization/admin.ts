import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function authorizationAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<NextFunction | Response> {
  try {
    const { authorization } = req.headers;
    const errors: string[] = [];

    console.log('authorizaation:', authorization);

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

    if (req.session.adminId === undefined || req.session.adminId === null) {
      return res.status(401).send({
        status_code: 401,
        results: {},
        errors: ['Session does not exist'],
      });
    }

    bcrypt.compare(
      authorizationArr[1],
      req.session.adminId,
      async (compareError, isMatch) => {
        if (compareError) {
          errors.push(compareError.message);
          return res.status(401).send({
            status_code: 401,
            results: {},
            errors: [compareError.message],
          });
        }

        if (!isMatch) {
          return res.status(401).send({
            status_code: 401,
            results: {},
            errors: ['Password authorization is invalid'],
          });
        }
      },
    );

    if (errors.length > 0) {
      console.log(errors);
      return res.status(401).send({
        status_code: 401,
        results: {},
        errors,
      });
    }
  } catch (err) {
    return res.status(401).send({
      status_code: 401,
      results: {},
      errors: [err],
    });
  }

  next();
}
