const express = require('express');
const alertsController = require('../controllers/alertsController');
const router = express.Router();

router.get('/checkMessages', alertsController.checkMessages);

router.post('/markMessage/:id', alertsController.markMessagesAsSeen);

router.delete('/deleteMessage/:id', alertsController.deleteMessage);

router.get('/checkNotifications', alertsController.checkNotifications);

router.get('/checkNotificationsForNavbar', alertsController.checkNotificationsForNavbar);

module.exports = router;