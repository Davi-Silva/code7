import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { error } from '@utils/logger/logger';
import { validateRegisterAdminInput } from '@utils/validators/inputs';
import { sanitizeRegisterInput, sanitizeLoginInput } from '@utils/sanitizer';

import { CustomRequest } from '@interfaces/controllers';
import {
  IRegisterAdminRequest,
  ILoginAdminRequest,
} from '@interfaces/controllers/admins';

import Admin from '@models/Admin/Admin';
import session from 'express-session';

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

        return res.status(200).send({
          status_code: 200,
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
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return res.status(500).send({
                status_code: 500,
                results: {},
                errors: [err.message],
              });
            }

            bcrypt.hash(
              adminObj.get().id.toString(),
              salt,
              async (hashError, hash) => {
                if (hashError) {
                  return res.status(500).send({
                    status_code: 500,
                    results: {},
                    errors: [hashError.message],
                  });
                }

                req.session.adminId = hash;

                return res.status(200).send({
                  status_code: 200,
                  results: {
                    adminId: req.session.adminId,
                  },
                  errors: [],
                });
              },
            );
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
