import { Router } from 'express';
import { getToken } from '../controllers/auth.controller';
import { authMiddleware, restaurantId } from '../middleware/auth.middleware';

const router = Router();

router.get('/token/:code', getToken);
router.get('/resId', authMiddleware, restaurantId);

export default router;