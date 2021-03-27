const db = require('../../db');
const utilities = require('../../utilities');
const router = require('express').Router();

router.use((req, res) => {
    let newTicket = {
        ref: utilities.uuidMaker(),
        ticketEntries: utilities.ticketEntryMaker(1,45),
        timeStamp: utilities.timeStampGenerator()
    }
    db.tickets.push(newTicket);
    res.send(newTicket);
})

module.exports = router;