import { Router } from 'express';

import { storeAll, create } from '@controllers/users';

import { validateCreateUserRequest } from '@middlewares/validators/request';
import { authorizationAdmin } from '@middlewares/authorization/admin';

const router = Router();

router.post('/store/all', storeAll);

router.post('/create', authorizationAdmin, validateCreateUserRequest, create);

export default router;
