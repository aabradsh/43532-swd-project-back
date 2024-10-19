const express = require('express');
const router = express.Router();
const {getNotifications} = require('../controllers/NotificationsController');


// Route to fetch notifications for a specific user
router.get('/', getNotifications);

module.exports = router;

