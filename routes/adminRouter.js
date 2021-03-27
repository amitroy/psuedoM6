const router = require('express').Router();
const adminParticipantsEnquiry = require('../controllers/admin/adminParticipantsEnquiry');
const adminWinnersEnquiry = require('../controllers/admin/adminWinnersEnquiry');

router.route('/participants').get(adminParticipantsEnquiry);
router.route('/winners').get(adminWinnersEnquiry);


module.exports = router;