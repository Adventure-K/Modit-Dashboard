const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get(`/:id`, (req, res) => {
    console.log('req.params.id:', req.params.id)
    const query = `
        SELECT * FROM "user" WHERE id = $1;`;
    pool.query(query, [req.params.id])
        .then(response => {
            console.log('response.rows:', response.rows)
            res.send(response.rows);
        }).catch(err => {
            console.log('selectedUser GET', err);
            res.sendStatus(500);
        })
})

module.exports = router;
