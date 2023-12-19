"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const router = (0, express_1.Router)();
router.get('/all', restaurant_controller_1.getAllRestaurants);
router.post('/new', restaurant_controller_1.postRestaurant);
router.get('/search', restaurant_controller_1.searchRestaurant);
exports.default = router;
