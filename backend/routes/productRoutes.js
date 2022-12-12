import express from 'express';
const router = express.Router();
import formidable from 'express-formidable';

// Middlewares
import { authCheck, isAdmin } from '../middlewares/authMiddleware.js';

// Controllers
import { create, list, read } from '../controllers/productControllers.js';

router.post('/product', authCheck, isAdmin, formidable(), create);
router.get('/products', list);
router.get('product/:slug', read);

export default router;
