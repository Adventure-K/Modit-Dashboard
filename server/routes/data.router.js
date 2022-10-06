const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    // console.log(req.params);
    let patientId = Number(req.params.id)
    console.log('yh', patientId);
    const queryText = `
    SELECT "session_data".* FROM "session_data"
    JOIN "session"
    ON "session_data".session_id = "session".id
    WHERE "session".modit_id = $1;
    `;

    pool.query(queryText, [patientId])
    .then(response => {
        console.log(response.rows);
        res.send(response.rows)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

module.exports = router;