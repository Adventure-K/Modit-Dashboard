const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => { // Get all institutions
    console.log('Institutions GET')
    const query = `
        SELECT * FROM "institution"`
        pool.query(query)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Insts GET', err);
            res.sendStatus(500);
        })
})

module.exports = router;