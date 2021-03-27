const router = require('express').Router();
const ticketRouter = require('./ticketRouter');
const enquiryRouter = require('./enquiryRouter');
const adminRouter = require('./adminRouter');

router.use('/ticket', ticketRouter);
router.use('/result', enquiryRouter);
router.use('/admin', adminRouter);

module.exports = router;