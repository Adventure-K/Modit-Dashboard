const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { rejectUnauthorized3 } = require('../modules/authorization3-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, rejectUnauthorized3, (req, res) => { // Get all institutions for the admin list
    console.log('in institution get')
    const query = `
        SELECT "institution".*, "user".first_name, "user".last_name, "user".inst_id, "user".user_level FROM "institution"
        LEFT OUTER JOIN "user"
        ON "user".id = "institution".rh_id
        WHERE "user".user_level = '2' OR "institution".rh_id IS NULL;`;
    pool.query(query)
        .then(result => {
            console.log('inst GET', result.rows)
            res.send(result.rows)
        }).catch(err => {
            console.log('Institutions GET', err);
            res.sendStatus(500);
        })
})

router.post('/', rejectUnauthenticated, rejectUnauthorized3, (req, res) => { // add new institution

    const i = req.body;
    const query = `
        INSERT INTO "institution" ("name", "street_address", "city", "state", "zip")
        VALUES ($1, $2, $3, $4, $5)`;
    const values = [i.name, i.street_address, i.city, i.state, i.zip];
    pool.query(query, values)
        .then(result => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('Institution POST', err);
            res.sendStatus(500);
        })
})

module.exports = router;