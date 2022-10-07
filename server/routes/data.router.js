const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    // console.log(req.params);
    let patientId = Number(req.params.id)
    // console.log('yh', patientId);
    const queryText = `
    SELECT * FROM "session"
    JOIN "patient"
    ON "session".modit_id = "patient".modit_id
    WHERE "session".modit_id = "patient".modit_id AND "patient".id = $1;`;

    pool.query(queryText, [patientId])
    .then(response => {
        console.log('heyo',response.rows);
        res.send(response.rows[0])
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

module.exports = router;