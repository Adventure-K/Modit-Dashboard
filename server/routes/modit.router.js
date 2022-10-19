const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this endpoint receives a JSON object (output of the ABMap.py) and inserts it into the "session" table.
router.post('/', (req, res) => {

    const query = `INSERT INTO "session" ("modit_id", "proportionOfGazeTimeOnDrugs", "proportionOfGazeTimeOnNonDrugs", "proportionOfGazeTimeOnBack", "proportionOfGazeTimeOnDrugsNoBack", "proportionOfGazeTimeOnNonDrugsNoBack")
    VALUES  ($1, $2, $3, $4, $5, $6);`;
    pool.query(query, [req.body.modit_id, req.body.proportionOfGazeTimeOnDrugs, req.body.proportionOfGazeTimeOnNonDrugs, req.body.proportionOfGazeTimeOnBack, req.body.proportionOfGazeTimeOnDrugsNoBack, req.body.proportionOfGazeTimeOnNonDrugsNoBack])
        .then(response => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;
