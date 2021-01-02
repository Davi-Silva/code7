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
    const debts = await Debt.findAll({ where: { user_id: userId } });

    return res.status(200).send({
      status_code: 200,
      results: debts,
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

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Client not found'],
      });
    }

    await Debt.create({
      user_id: user.get().id,
      reason: debt.reason,
      amount: debt.amount,
      created_at: Date.now(),
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

export async function getDebt(req: Request, res: Response): Promise<Response> {
  const { debtId } = req.params;

  try {
    const debt = await Debt.findByPk(debtId);

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
  const { debtId } = req.params;
  const { debt } = req.body;

  try {
    const debtObj = await Debt.findByPk(debtId);

    if (!debtObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Debt not found'],
      });
    }

    await Debt.update(
      {
        reason: debt.reason,
        amount: debt.amount,
      },
      {
        where: { id: debtId },
      },
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

export async function deleteDebt(
  req: Request,
  res: Response,
): Promise<Response> {
  const { debtId } = req.params;

  try {
    const debtObj = await Debt.findByPk(debtId);

    if (!debtObj) {
      return res.status(400).send({
        status_code: 400,
        results: {},
        errors: ['Debt not found'],
      });
    }

    await debtObj.destroy();

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
