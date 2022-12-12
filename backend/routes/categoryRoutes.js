import express from 'express';

const router = express.Router();

// Middlewares
import { authCheck, isAdmin } from '../middlewares/authMiddleware.js';

// Controllers
import {
  create,
  update,
  remove,
  list,
} from '../controllers/categoryControllers.js';

router.post('/category', authCheck, isAdmin, create);
router.put('/category/:slug', authCheck, isAdmin, update);
router.delete('/category/:slug', authCheck, isAdmin, remove);
router.get('/categories', list);

export default router;
