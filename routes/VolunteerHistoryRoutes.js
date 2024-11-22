const express = require('express');
const router = express.Router();

const {showEvents} = require('../controllers/VolunteerHistoryController');
const {isVolunteerAdmin} = require('../controllers/VolunteerHistoryController');
const authenticateJWT = require('../middleware/authMiddleware');
// Route to get all appropriate events

router.get('/show', authenticateJWT, showEvents);
router.get('/isAdmin',authenticateJWT,isVolunteerAdmin);

module.exports = router;