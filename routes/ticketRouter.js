const router = require('express').Router();
const ticketFactory = require('../controllers/participants/ticketFactory');

router.route('/purchase').get(ticketFactory);

module.exports = router;