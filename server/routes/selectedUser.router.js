const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
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
