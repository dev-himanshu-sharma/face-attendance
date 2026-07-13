const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

router.use(protect);

router.get('/', ctrl.myNotifications);
router.post('/read', ctrl.markRead);

module.exports = router;