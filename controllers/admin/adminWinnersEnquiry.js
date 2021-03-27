const router = require('express').Router();
const db = require('../../db');

router.use((req, res) => {
    res.send(db.winners);
})

module.exports = router;