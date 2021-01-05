import { Request, Response } from 'express';

import { error } from '@utils/logger/logger';

import { CustomRequest } from '@interfaces/controllers';
import {
  ICreateDebtRequest,
  IUpdateDebtRequest,
} from '@interfaces/controllers/debts';

import User from '@models/User/User';
import Debt from '@models/User/Debt/Debt';

export async function indexDebtsByClient(
  req: Request,
  res: Response,
): Promise<Response> {
  const { userId } = req.params;

  try {
    const userObj = await User.findOne({
      _id: userId,
    }).populate({
      path: 'debt',
      model: Debt,
    });

    if (!userObj) {
      return res.status(500).send({
        status_code: 500,
        results: {},
        errors: ['User does not exist'],
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: userObj.debt,
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

export async function createDebt(
  req: CustomRequest<ICreateDebtRequest>,
  res: Response,
): Promise<Response> {
  const { userId } = req.params;
  const { debt } = req.body;

  console.log(req.body);

  try {
    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Client not found'],
      });
    }

    const newDebt = new Debt({
      reason: debt.reason,
      amount: debt.amount,
      date: debt.date,
      created_at: Date.now(),
    });

    const debtObj = await newDebt.save();

    const debtArray = [...user.debt];

    debtArray.push(debtObj._id);

    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        debt: debtArray,
      },
      { runValidators: true },
    );

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

export async function getDebt(req: Request, res: Response): Promise<Response> {
  const { debtId } = req.params;

  try {
    const debt = await Debt.findOne({
      _id: debtId,
    });

    if (!debt) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Debt not found'],
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: debt,
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

export async function updateDebt(
  req: CustomRequest<IUpdateDebtRequest>,
  res: Response,
): Promise<Response> {
  const { debts } = req.body;

  try {
    debts.forEach(async (debt) => {
      await Debt.findOneAndUpdate(
        {
          _id: debt.id,
        },
        {
          reason: debt.reason,
          amount: debt.amount,
          date: debt.date,
        },
        { runValidators: true },
      );
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

export async function deleteDebt(
  req: Request,
  res: Response,
): Promise<Response> {
  const { debtId } = req.params;

  try {
    const debtObj = await Debt.findOne({
      _id: debtId,
    });

    if (!debtObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Debt not found'],
      });
    }

    await debtObj.delete();

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
