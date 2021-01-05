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
import AddressGeo from '@models/User/Address/Geo/Geo';
import Company from '@models/User/Company/Company';
import Debt from '@models/User/Debt/Debt';

export async function storeAll(req: Request, res: Response): Promise<Response> {
  try {
    const users: [IUserPlaceholder] = await get(
      'https://jsonplaceholder.typicode.com/users',
    );

    users.forEach(async (user) => {
      const newCompany = new Company({
        name: user.company.name,
        catch_phrase: user.company.catchPhrase,
        bs: user.company.bs,
        created_at: Date.now(),
        updated_at: null,
      });

      const companyObj = await newCompany.save();

      const newAddressGeo = new AddressGeo({
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
        created_at: Date.now(),
        updated_at: null,
      });

      const addressGeoObj = await newAddressGeo.save();

      const newAddressObj = new Address({
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zip_code: user.address.zipcode,
        geo: addressGeoObj._id,
        created_at: Date.now(),
        updated_at: null,
      });

      const addressObj = await newAddressObj.save();

      const newUserObj = new User({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        address: addressObj._id,
        company: companyObj._id,
        created_at: Date.now(),
      });

      await newUserObj.save();
    });

    const usersDb = await User.find()
      .populate({
        path: 'address',
        model: Address,
        populate: {
          path: 'geo',
          model: AddressGeo,
        },
      })
      .populate({
        path: 'company',
        model: Company,
      })
      .populate({
        path: 'debt',
        model: Debt,
      });

    console.log('usersDb:', usersDb);

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
    const newCompany = new Company({
      name: company.name,
      catch_phrase: company.catchPhrase,
      bs: company.bs,
      created_at: Date.now(),
      updated_at: null,
    });

    const companyObj = await newCompany.save();

    const newAddressGeo = new AddressGeo({
      lat: address.geo.lat,
      lng: address.geo.lng,
      created_at: Date.now(),
      updated_at: null,
    });

    const addressGeoObj = await newAddressGeo.save();

    const newAddress = new Address({
      street: address.street,
      suite: address.suite,
      city: address.city,
      zip_code: address.zipCode,
      geo: addressGeoObj._id,
      created_at: Date.now(),
      updated_at: null,
    });

    const addressObj = await newAddress.save();

    const newUserObj = new User({
      name: client.name,
      username: client.username,
      email: client.email,
      phone: client.phone,
      website: client.website,
      company: companyObj._id,
      address: addressObj._id,
      created_at: Date.now(),
    });

    await newUserObj.save();

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
    const users = await User.find()
      .populate({
        path: 'address',
        model: Address,
        populate: {
          path: 'geo',
          model: AddressGeo,
        },
      })
      .populate({
        path: 'company',
        model: Company,
      });

    const convertedUsers: any[] = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      };
    });

    return res.status(200).send({
      status_code: 200,
      results: convertedUsers,
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

    const user = await User.findOne({
      _id: userId,
    }).populate({
      path: 'debt',
      model: Debt,
    });

    const debtArray = user.debt.map((d) => {
      return {
        id: d._id,
        reason: d.reason,
        amount: d.amount,
        date: d.date,
      };
    });

    const userObj = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      debt: debtArray,
    };

    return res.status(200).send({
      status_code: 200,
      results: userObj,
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
    const users = await User.find().populate({
      path: 'debt',
      model: Debt,
    });

    const convertedUsers: any[] = users.map((user) => {
      const debtArray: any[] = user.debt.map((d) => {
        return {
          reason: d.reason,
          amount: d.amount,
          date: d.date,
        };
      });

      return {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        debt: debtArray,
      };
    });

    return res.status(200).send({
      status_code: 200,
      results: convertedUsers,
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
    const userObj = await User.findOne({
      _id: userId,
    })
      .populate({
        path: 'address',
        model: Address,
        populate: {
          path: 'geo',
          model: AddressGeo,
        },
      })
      .populate({
        path: 'company',
        model: Company,
      })
      .populate({
        path: 'debt',
        model: Debt,
      });

    if (!userObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['User not found'],
      });
    }

    const addressGeoObj = await AddressGeo.findOne({
      _id: userObj.address.geo._id,
    });

    addressGeoObj.remove();

    const addressObj = await Address.findOne({
      _id: userObj.address._id,
    });

    addressObj.remove();

    const promisesDebtDeletion = userObj.debt.map(async (d) => {
      const debtObj = await Debt.findOne({
        _id: d._id,
      });

      debtObj.remove();
    });

    await Promise.all(promisesDebtDeletion);

    const companyObj = await Company.findOne({
      _id: userObj.company._id,
    });

    companyObj.remove();

    await userObj.delete();

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
