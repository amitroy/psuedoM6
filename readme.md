# Introduction
This is a miniature Mark 6 lottery ticket drawing API

## Dependency
* NodeJS 14

## Installation
Use npm manager to install all the dependencies by using the following command
```bash
npm install
```
## Usage
* Start the API by using 
```bash
npm start
```
* Server starts after the execution of test cases
* Check the log to find out the default port the API is listening for (default is 8888)
* You may alter the configuration such as server port and ticket draw interval from `.env` file
* Default host is http://localhost:8888
* There are two categories of API
  * Participants(public)
  * Administrators

## Participant APIs

```bash 
GET /api/v1/ticket/purchase
```
On calling this API you shall generate/purchase a ticket for yourself e.g.
```json
{
    "ref": "7be958f4-3557-e21d-bd99-5e6b13225da2",
    "ticketEntries": "2+26+37+36+15+18",
    "timeStamp": "2021-03-27T18:36:00.085Z"
}
```
In background the continuous draw is occuring every X seconds (configurable from .env file). You may check the outcome of your ticket after the latest draw using
```bash 
GET /api/v1/result/ticket?ref=uuid-here
```
Example Request
```bash 
GET http://localhost:8888/api/v1/result/ticket?ref=7be958f4-3557-e21d-bd99-5e6b13225da2
```
Example Response
```json
{
    "isWinner": false,
    "message": "Sorry, you did not win anything. Better luck next time"
}
```
or
```json
{
    "isWinner": true,
    "message": "Congratulations! you have won XXXXHKD. Please visit http://m6.cxm/redeem to redeem your reward."
}
```
depending whether the ticket had actually won or not

## Admin APIs

```bash 
GET /api/v1/admin/participants
```
On calling this API you shall get the list of all the current participants
```json
[
    {
        "ref": "6f0fecec-e96b-5138-e042-39f5fd93b695",
        "ticketEntries": "21+34+10+35+21+9",
        "timeStamp": "2021-03-27T19:28:26.112Z"
    },
    {
        "ref": "28905f78-99a6-4c2c-5ed9-a6d3b935d134",
        "ticketEntries": "27+14+1+29+22+6",
        "timeStamp": "2021-03-27T19:28:26.923Z"
    }
]
```
As the continuous draw is occuring every X seconds. The number of participants will reduce after the draws occur. Once the winner is selected, they are moved to a different array. To check the winners, the below API will come useful

```bash 
GET /api/v1/admin/winners
```
Example Request
```bash 
GET http://localhost:8888/api/v1/admin/winners
```
Example Response
```json
[
    {
        "DeclarationTimeStamp": "2021-03-27T19:37:36.588Z",
        "winnerTicket": [
            {
                "ref": "6f9cdc7e-7513-3c9c-6536-02db4ca22545",
                "ticketEntries": "44+39+8+2+38+11",
                "timeStamp": "2021-03-27T19:37:33.083Z"
            }
        ]
    }
]
```
or
```json
[]
```
depending whether the auto draw has ran or not