const router = require('express').Router();
const utilities = require('../../utilities');
const db = require('../../db');

router.use((req, res) => {
    const ticketReference = req.query.ref;
    console.log(ticketReference);
    if (ticketReference) {
        const filteredWinners = db.winners.filter(winner => {
            console.log(winner.winnerTicket[0].ref)
            return ticketReference === winner.winnerTicket[0].ref;
        })
        console.log(filteredWinners)
        if (filteredWinners.length > 0) {
            res.send({
                isWinner: true,
                message: 'Congratulations! you have won XXXXHKD. Please visit http://m6.cxm/redeem to redeem your reward.'
            })
        } else {
            res.send({
                isWinner: false,
                message: 'Sorry, you did not win anything. Better luck next time'
            })
        }
    } else {
        res.status(400).send({
            ErrorCode: 400,
            ErrorMessage: 'Mandatory query parameter \'ref\' is missing'
        });
    }
})

module.exports = router;