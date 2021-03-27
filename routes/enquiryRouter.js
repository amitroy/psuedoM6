const router = require('express').Router();
const resultEnquiry = require('../controllers/participants/resultEnquiry');

router.route('/ticket').get(resultEnquiry);

module.exports = router;