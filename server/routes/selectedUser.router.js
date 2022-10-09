const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized2 } = require('../modules/authorization2-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {
    console.log(req.params);
    const query = `
        SELECT * FROM "user" WHERE id = $1;`;
    pool.query(query, [req.params.id])
        .then(response => {
            res.send(response.rows);
        }).catch(err => {
            console.log('selectedUser GET', err);
            res.sendStatus(500);
        })
})

module.exports = router;
