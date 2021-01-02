import { Router } from 'express';

import {
  indexDebtsByClient,
  getDebt,
  createDebt,
  updateDebt,
  deleteDebt,
} from '@controllers/debts';

const router = Router();

router.get('/:userId', indexDebtsByClient);

router.get('/:debtId/details', getDebt);

router.post('/:userId/create', createDebt);

router.put('/:debtId', updateDebt);

router.delete('/:debtId', deleteDebt);

export default router;
