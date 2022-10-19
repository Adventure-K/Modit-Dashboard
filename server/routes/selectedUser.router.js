const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized2 } = require('../modules/authorization2-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// This route governs requests by research heads to view selected users. 

router.get('/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {

    const query = `
        SELECT * FROM "user" WHERE id = $1;`;
    pool.query(query, [req.params.id])
        .then(response => {
            console.log('response.rows:', response.rows)
            res.send(response.rows[0]);
        }).catch(err => {
            console.log('selectedUser GET', err);
            res.sendStatus(500);
        })
})

module.exports = router;
