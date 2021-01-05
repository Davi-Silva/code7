import { Request, Response } from 'express';

import { get } from '@services/api';
import { error } from '@utils/logger/logger';

import { CustomRequest } from '@interfaces/controllers';
import {
  ICreateUserRequest,
  IUserPlaceholder,
} from '@interfaces/controllers/users';

import User from '@models/User/User';
import Address from '@models/User/Address/Address';
import AddressesGeo from '@models/User/Address/Geo/Geo';
import Company from '@models/User/Company/Company';

export async function storeAll(req: Request, res: Response): Promise<Response> {
  try {
    const users: [IUserPlaceholder] = await get(
      'https://jsonplaceholder.typicode.com/users',
    );

    users.forEach(async (user) => {
      const userObj = await User.create({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        created_at: Date.now(),
      });

      await Company.create({
        user_id: userObj.get().id,
        name: user.company.name,
        catch_phrase: user.company.catchPhrase,
        bs: user.company.bs,
        created_at: Date.now(),
        updated_at: null,
      });

      const addressObj = await Address.create({
        user_id: userObj.get().id,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zip_code: user.address.zipcode,
        created_at: Date.now(),
        updated_at: null,
      });

      await AddressesGeo.create({
        address_id: addressObj.get().id,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
        created_at: Date.now(),
        updated_at: null,
      });
    });

    const usersDb = await User.findAll({
      include: [
        { association: 'address', include: [{ association: 'geo' }] },
        { association: 'company' },
      ],
    });

    return res.status(200).send({
      status_code: 200,
      results: usersDb,
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

export async function create(
  req: CustomRequest<ICreateUserRequest>,
  res: Response,
): Promise<Response> {
  const { client, address, company } = req.body;
  try {
    const userObj = await User.create({
      name: client.name,
      username: client.username,
      email: client.email,
      phone: client.phone,
      website: client.website,
      created_at: Date.now(),
    });

    await Company.create({
      user_id: userObj.get().id,
      name: company.name,
      catch_phrase: company.catchPhrase,
      bs: company.bs,
      created_at: Date.now(),
      updated_at: null,
    });

    const addressObj = await Address.create({
      user_id: userObj.get().id,
      street: address.street,
      suite: address.suite,
      city: address.city,
      zip_code: address.zipCode,
      created_at: Date.now(),
      updated_at: null,
    });

    await AddressesGeo.create({
      address_id: addressObj.get().id,
      lat: address.geo.lat,
      lng: address.geo.lng,
      created_at: Date.now(),
      updated_at: null,
    });

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

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const users = await User.findAll();

    return res.status(200).send({
      status_code: 200,
      results: users,
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

export async function getUser(req: Request, res: Response): Promise<Response> {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [{ association: 'debt' }],
    });

    return res.status(200).send({
      status_code: 200,
      results: user,
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

export async function indexWithDebts(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const users = await User.findAll({
      include: [
        {
          association: 'debt',
        },
      ],
    });

    return res.status(200).send({
      status_code: 200,
      results: users,
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

export async function deleteUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { userId } = req.params;

  try {
    const userObj = await User.findByPk(userId);

    if (!userObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['User not found'],
      });
    }

    await userObj.destroy();

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
