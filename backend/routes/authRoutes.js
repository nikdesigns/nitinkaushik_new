import express from 'express';
import {
  getUsers,
  register,
  login,
  secret,
} from '../controllers/authControllers.js';

//middlewares
import { authCheck, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', register);
router.post('/login', login);
//testing auth middleware
router.get('/secret', authCheck, isAdmin, secret);

export default router;
