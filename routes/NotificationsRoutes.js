const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware'); // To protect the route

const router = express.Router();

// Get notifications for the authenticated user
router.get('/', authMiddleware, getNotifications);

module.exports = router;
