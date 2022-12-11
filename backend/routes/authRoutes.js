import express from 'express';
import { getUsers, register } from '../controllers/authControllers.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', register);

export default router;
