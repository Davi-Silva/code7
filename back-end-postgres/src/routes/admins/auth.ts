import { Router } from 'express';

import {
  register,
  login,
  getSession,
  revokeSession,
  loginDecodeToken,
} from '@controllers/admins/auth';

import {
  validateCreateAdminRequest,
  validateLoginAdminRequest,
  validateSessionAdminRequest,
} from '@middlewares/validators/request';
import { authorizationAdmin } from '@middlewares/authorization/admin';

const router = Router();

router.post('/register', validateCreateAdminRequest, register);

router.post('/login', validateLoginAdminRequest, login);

router.get('/login/decode/token', authorizationAdmin, loginDecodeToken);

router.get(
  '/session',
  authorizationAdmin,
  validateSessionAdminRequest,
  getSession,
);

router.get(
  '/session/revoke',
  authorizationAdmin,
  validateSessionAdminRequest,
  revokeSession,
);

export default router;
