import { Router } from 'express';

import {
  storeAll,
  create,
  index,
  getUser,
  indexWithDebts,
  deleteUser,
} from '@controllers/users';

import { validateCreateUserRequest } from '@middlewares/validators/request';
import { authorizationAdmin } from '@middlewares/authorization/admin';

const router = Router();

router.post('/store/all', storeAll);

router.get('', index);

router.get('/id/:userId', getUser);

router.get('/debts', indexWithDebts);

router.post('/create', authorizationAdmin, validateCreateUserRequest, create);

router.delete('/:userId', authorizationAdmin, deleteUser);

export default router;
