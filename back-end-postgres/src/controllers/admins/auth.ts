import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { error } from '@utils/logger/logger';
import { validateRegisterAdminInput } from '@utils/validators/inputs';
import { sanitizeRegisterInput, sanitizeLoginInput } from '@utils/sanitizer';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@utils/generators/jwt/jwt';

import { CustomRequest } from '@interfaces/controllers';
import {
  IRegisterAdminRequest,
  ILoginAdminRequest,
} from '@interfaces/controllers/admins';

import Admin from '@models/Admin/Admin';

export async function register(
  req: CustomRequest<IRegisterAdminRequest>,
  res: Response,
): Promise<Response> {
  const { admin } = req.body;

  try {
    const sanitizedInputs = sanitizeRegisterInput(
      admin.name,
      admin.username,
      admin.email,
    );

    const inputValidation = await validateRegisterAdminInput(
      sanitizedInputs.email,
      sanitizedInputs.username,
    );

    if (!inputValidation.valid) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: inputValidation.errors,
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).send({
          status_code: 500,
          results: {},
          errors: [err.message],
        });
      }

      bcrypt.hash(admin.password, salt, async (hashError, hash) => {
        if (hashError) {
          return res.status(500).send({
            status_code: 500,
            results: {},
            errors: [hashError.message],
          });
        }

        await Admin.create({
          name: sanitizedInputs.name,
          username: sanitizedInputs.username,
          email: sanitizedInputs.email,
          password: hash,
          created_at: Date.now(),
        });

        return res.status(201).send({
          status_code: 201,
          results: {},
          errors: [],
        });
      });
    });
  } catch (err) {
    error(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function login(
  req: CustomRequest<ILoginAdminRequest>,
  res: Response,
): Promise<Response> {
  const { admin } = req.body;

  try {
    const sanitizedInputs = sanitizeLoginInput(admin.email);

    const adminObj = await Admin.findOne({
      where: {
        email: sanitizedInputs.email,
      },
    });

    if (!adminObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Admin does not exist'],
      });
    }

    bcrypt.compare(
      admin.password,
      adminObj.get().password,
      (compareError, isMatch) => {
        if (compareError) {
          return res.status(500).send({
            status_code: 500,
            results: {},
            errors: [compareError.message],
          });
        }

        if (isMatch) {
          const accessToken: string = generateAccessToken(adminObj.get().id);
          const refreshToken: string = generateRefreshToken(adminObj.get().id);

          return res.status(200).send({
            status_code: 200,
            results: {
              accessToken,
              refreshToken,
            },
            errors: [],
          });
        } else {
          return res.status(500).send({
            status_code: 500,
            results: {},
            errors: ['Password is incorrect'],
          });
        }
      },
    );
  } catch (err) {
    error(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export function loginDecodeToken(
  req: Request,
  res: Response,
): Promise<Response> {
  const { authorization } = req.headers;

  try {
    const authorizationArr = authorization.split(' ');

    jwt.verify(
      authorizationArr[1],
      process.env.JWT_ACCESS_TOKEN_SECRET,
      async (err, decoded: { adminId: string }): Promise<Response> => {
        if (err) {
          return res.status(401).send({
            status_code: 401,
            results: {},
            errors: [err],
          });
        }

        const adminObj = await Admin.findOne({
          where: { id: decoded.adminId },
        });

        if (!adminObj) {
          return res.status(404).send({
            status_code: 404,
            results: {},
            errors: ['Admin not found'],
          });
        }

        return res.status(200).send({
          status_code: 200,
          results: adminObj,
          errors: [],
        });
      },
    );
  } catch (err) {
    error(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function getSession(
  req: Request,
  res: Response,
): Promise<Response> {
  const { authorization } = req.headers;

  try {
    const authorizationArr = authorization.split(' ');

    const adminObj = await Admin.findOne({
      where: {
        id: parseInt(authorizationArr[1]),
      },
    });

    if (!adminObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Invalid session adminId'],
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: adminObj,
      errors: [],
    });
  } catch (err) {
    error(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function revokeSession(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    req.session.destroy();
    return res.status(200).send({
      status_code: 200,
      results: {},
      errors: [],
    });
  } catch (err) {
    error(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
