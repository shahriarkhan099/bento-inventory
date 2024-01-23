import { Router } from 'express';
import { getAutoPilotOfRestaurant, postAutoPilotToRestaurant, putAutoPilotOfRestaurant } from '../controllers/autoPilot.controller';
const router = Router();

router.get('/restaurant/:restaurantId', getAutoPilotOfRestaurant);
router.post('/restaurant/:restaurantId', postAutoPilotToRestaurant);
router.put('/restaurant/:restaurantId', putAutoPilotOfRestaurant);

export default router;