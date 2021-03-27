const crypto = require("crypto");

const limitedRandomNumberGenerator = (lowerThreshold, higherThreshold) => {
    return Math.floor(Math.random() * (lowerThreshold - higherThreshold) + higherThreshold);
}

/**
 * Makes a timestamp in ISO String
 * 
 * @return {Date} Date object with current timestamp
 */
const timeStampGenerator = () => {
    return new Date(Date.now());
}

/**
 * Generates a random UUID
 * 
 * @return {string} 36 character UUID in string
 */
const uuidMaker = () => {
    const randomizedAlphaNumeric = crypto.randomBytes(16).toString("hex");
    const uuid = [randomizedAlphaNumeric.slice(0, 8), '-', randomizedAlphaNumeric.slice(8, 12), '-', randomizedAlphaNumeric.slice(12, 16), '-', randomizedAlphaNumeric.slice(16, 20), '-', randomizedAlphaNumeric.slice(20, 32)].join('');
    return uuid;
}

/**
 * Generates a Mark 6 style ticket entry e.g. 32+18+12+24+09+33
 * 
 * @param {number} minimumInteger - Smallest integer to consider for the generation of the M6 string
 * @param {number} maximumInteger - Largest integer to consider for the generation of the M6 string
 * @return {string} Mark 6 style string e.g. "32+18+12+24+09+33"
 */
const ticketEntryMaker = (minimumInteger, maximumInteger) => {
    const DELIMITER = '+';
    const loopCount = 5;
    const ticketEntryStringHolder = [];
    for (let i = 0; i <= loopCount; i++) {
        let randomInteger = limitedRandomNumberGenerator(minimumInteger, maximumInteger);
        ticketEntryStringHolder.push(randomInteger);
        i === loopCount ? '' : ticketEntryStringHolder.push(DELIMITER);
    }
    return ticketEntryStringHolder.join('');
}

/**
 * Picks a random participant's ticket from an array
 * 
 * @param {array} allTickets - Array of all the participant tickets
 * @return {object} Randomly selected ticket object
 */
const drawTicket = (allTickets) => {
    const totalTicketsPurchased = allTickets.length;
    const drawIndex = limitedRandomNumberGenerator(0, totalTicketsPurchased);
    return allTickets.splice(drawIndex, 1);
}

/**
 * Moves the winning entry from participant's list to winners
 * 
 * @param {object} winningTicket - Ticket that was randomly selected as the winner
 * @param {object} allWinners - Winners array to push the winning ticket to
 * @return {number} Index of pushed winning ticket
 */
const keepWinnerRecord = (winningTicket, allWinners) => {
    const winner = {
        DeclarationTimeStamp: timeStampGenerator(),
        winnerTicket: winningTicket
    }
    return winningTicket.length <= 0 ? null : allWinners.push(winner);
}

/**
 * Interval based function to start the ticket draw from ticket array
 * 
 * @param {number} timeIntervalInMiliSeconds - Time in millisecond for executing the random ticket draw(s)
 * @param {array} allTickets - Array of all the participant tickets
 * @param {array} allWinners - Winners array to push the winning ticket to
 * 
 */
const startAutoDraw = (timeIntervalInMiliSeconds, allTickets, allWinners) => {
    setInterval(() => {
        keepWinnerRecord(drawTicket(allTickets), allWinners);
    }, timeIntervalInMiliSeconds)
}

module.exports = {
    timeStampGenerator,
    uuidMaker,
    ticketEntryMaker,
    startAutoDraw
};