import { NextFunction, Request, Response } from 'express';

import { CustomRequest } from '@interfaces/controllers';
import { ICreateUserRequest } from '@interfaces/controllers/users/index';
import {
  IRegisterAdminRequest,
  ILoginAdminRequest,
} from '@interfaces/controllers/admins/index';
import { error } from '@utils/logger/logger';

export function validateCreateUserRequest(
  req: CustomRequest<ICreateUserRequest>,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { address, client, company } = req.body;

  const errors: string[] = [];

  if (!client.email) {
    errors.push('Client email is required.');
  } else {
    if (client.email.length === 0) {
      errors.push('Client email must be valid.');
    } else {
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(client.email).toLowerCase())) {
        errors.push('Client email must be valid.');
      }
    }
  }

  if (!client.name) {
    errors.push('Client name is required.');
  } else {
    if (client.name.length === 0) {
      errors.push('Client name must be valid.');
    }
  }

  if (!client.phone) {
    errors.push('Client phone is required.');
  } else {
    if (client.phone.length === 0) {
      errors.push('Client phone must be valid.');
    }
  }

  if (!client.username) {
    errors.push('Client username is required.');
  } else {
    if (client.username.length === 0) {
      errors.push('Client username must be valid.');
    }
  }

  if (!client.website) {
    errors.push('Client website is required.');
  } else {
    if (client.website.length === 0) {
      errors.push('Client website must be valid.');
    }
  }

  if (!address.city) {
    errors.push('City name is required.');
  } else {
    if (address.city.length === 0) {
      errors.push('City name must be valid.');
    }
  }

  if (!address.geo.lat) {
    errors.push('Latitude is required.');
  } else {
    if (address.geo.lat.length === 0) {
      errors.push('Latitude name must be valid.');
    }
  }

  if (!address.geo.lng) {
    errors.push('Longitude is required.');
  } else {
    if (address.geo.lng.length === 0) {
      errors.push('Longitude name must be valid.');
    }
  }

  if (!address.street) {
    errors.push('Street name is required.');
  } else {
    if (address.street.length === 0) {
      errors.push('Street name must be valid.');
    }
  }

  if (!address.suite) {
    errors.push('Suite is required.');
  } else {
    if (address.suite.length === 0) {
      errors.push('Suite must be valid.');
    }
  }

  if (!address.zipCode) {
    errors.push('Zip code is required.');
  } else {
    if (address.zipCode.length === 0) {
      errors.push('Zip code must be valid.');
    }
  }

  if (!company.name) {
    errors.push('Company name is required.');
  } else {
    if (company.name.length === 0) {
      errors.push('Company name must be valid.');
    }
  }

  if (!company.catchPhrase) {
    errors.push('Company catch phrase is required.');
  } else {
    if (company.catchPhrase.length === 0) {
      errors.push('Company catch phrase must be valid.');
    }
  }

  if (!company.bs) {
    errors.push('Company bs is required.');
  } else {
    if (company.bs.length === 0) {
      errors.push('Company bs must be valid.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors: errors,
    });
  }

  next();
}

export function validateCreateAdminRequest(
  req: CustomRequest<IRegisterAdminRequest>,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { admin } = req.body;

  const errors: string[] = [];

  if (!admin.email) {
    errors.push('Admin email is required.');
  } else {
    if (admin.email.length === 0) {
      errors.push('Admin email must be valid.');
    } else {
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(admin.email).toLowerCase())) {
        errors.push('Admin email must be valid.');
      }
    }
  }

  if (!admin.name) {
    errors.push('Admin name is required.');
  } else {
    if (admin.name.length === 0) {
      errors.push('Admin name must be valid.');
    }
  }

  if (!admin.username) {
    errors.push('Admin username is required.');
  } else {
    if (admin.username.length === 0) {
      errors.push('Admin username must be valid.');
    }
  }

  if (!admin.password) {
    errors.push('Admin password is required.');
  } else {
    if (admin.password.length === 0) {
      errors.push('Admin password must be valid.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors: errors,
    });
  }

  next();
}

export function validateLoginAdminRequest(
  req: CustomRequest<ILoginAdminRequest>,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { admin } = req.body;

  const errors: string[] = [];

  if (!admin.email) {
    errors.push('Admin email is required.');
  } else {
    if (admin.email.length === 0) {
      errors.push('Admin email must be valid.');
    } else {
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(admin.email).toLowerCase())) {
        errors.push('Admin email must be valid.');
      }
    }
  }

  if (!admin.password) {
    errors.push('Admin password is required.');
  } else {
    if (admin.password.length === 0) {
      errors.push('Admin password must be valid.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors: errors,
    });
  }

  next();
}

export function validateSessionAdminRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { adminId } = req.session;

  const errors: string[] = [];

  if (!adminId) {
    errors.push('adminId session does not exist');
  }

  if (typeof adminId !== 'string') {
    errors.push('adminId is invalid');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors: errors,
    });
  }

  next();
}
