const request = require('supertest');
const app = require('../server');
const db = require('../db');

describe('GET /api/v1/ticket/purchase', () => {
    it('returns a new ticket json', () => {
        return request(app)
            .get('/api/v1/ticket/purchase')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res) => {
                if (!(res.body.ref.split('').length === 36)) {
                    throw new Error('Ticket reference has incorrect length');
                }
            })
            .expect((res) => {
                if (!(res.body.ticketEntries.split('+').length === 6)) {
                    throw new Error('Ticket entry has incorrect length');
                }
            })
            .expect((res) => {
                if (!(res.body.timeStamp)) {
                    throw new Error('Timestamp is missing');
                }
            })
    })
})

describe('GET /api/v1/result/ticket?ref=uuid-here', () => {
    it('Checks ticket status', () => {
        return request(app)
            .get('/api/v1/result/ticket?ref=uuid-here')
            .expect(200)
            .expect('Content-Type',"application/json; charset=utf-8")
            .expect((res) => {
                if (!(res.body.isWinner === true || res.body.isWinner === false)) {
                    throw new Error('isWinner is wrong or missing');
                }
            })
            .expect((res) => {
                if (!(res.body.message)) {
                    throw new Error('Timestamp is missing');
                }
            })
    })
})

describe('GET /api/v1/admin/participants', () => {
    it('Checks Admin API to list all participants', () => {
        return request(app)
            .get('/api/v1/admin/participants')
            .expect(200)
            .expect('Content-Type',"application/json; charset=utf-8")
            .expect((res) => {
                if ((res.body.length === 0)) {
                    throw new Error('Participants array is empty');
                }
            })
    })
})

describe('GET /api/v1/admin/winners', () => {
    it('Checks Admin API to list all winners', () => {
        db.winners.push({
            DeclarationTimeStamp: "2021-03-26T16:39:18.059Z",
            winnerTicket: {
                ref: 'ce8535a8-822c-4389-93f3-e655d52d6234',
                ticketEntries: '18+8+28+22+33+6',
                timeStamp: "2021-03-26T16:39:18.059Z"
            }
        });
        return request(app)
            .get('/api/v1/admin/winners')
            .expect(200)
            .expect('Content-Type',"application/json; charset=utf-8")
            .expect((res) => {
                if ((res.body.length === 0)) {
                    throw new Error('Winners array is empty');
                }
            })
            .expect((res) => {
                if (!(res.body[0].winnerTicket)) {
                    throw new Error('Winners list is invalid or empty');
                }
            })
    })
})