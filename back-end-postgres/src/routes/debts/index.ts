import { Router } from 'express';

import {
  indexDebtsByClient,
  getDebt,
  createDebt,
  updateDebt,
  deleteDebt,
} from '@controllers/debts';

import { authorizationAdmin } from '@middlewares/authorization/admin';

const router = Router();

router.get('/:userId', indexDebtsByClient);

router.get('/:debtId/details', getDebt);

router.post('/:userId/create', authorizationAdmin, createDebt);

router.put('', updateDebt);

router.delete('/:debtId', authorizationAdmin, deleteDebt);

export default router;
