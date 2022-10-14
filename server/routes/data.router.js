const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // console.log(req.params);
    let patientModitId = Number(req.params.id)

    const queryText = `
    SELECT * FROM "session"
    JOIN "patient"
    ON "session".modit_id = "patient".modit_id
    WHERE "session".modit_id = "patient".modit_id AND "patient".modit_id = $1;`;

    pool.query(queryText, [patientModitId])
    .then(response => {
        console.log('heyo',response.rows);
        res.send(response.rows)
        // patientDataArray is the array from the DB with all of that patient's entries
        // this sends back the last entry in the array, which should be the newest entry
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

router.get('/avgData/:id', rejectUnauthenticated, (req, res) => {
    let patientModitId = Number(req.params.id)
    console.log(patientModitId);

    const queryText = `
    SELECT CAST(AVG("proportionOfGazeTimeOnDrugs") AS DECIMAL(3,2)) AS "drugs",
    CAST(AVG("proportionOfGazeTimeOnNonDrugs") AS DECIMAL(3,2)) AS "noDrugs",
    CAST(AVG("proportionOfGazeTimeOnBack") AS DECIMAL(3,2)) AS "back"
    FROM "session" WHERE "modit_id" = $1;
    `;

    pool.query(queryText, [patientModitId])
    .then(response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(200);
    })
})

module.exports = router;