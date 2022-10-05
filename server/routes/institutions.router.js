const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => { // Get all institutions
    console.log('Institutions GET')
    const query = `
        SELECT "institution".*, "user".first_name, "user".last_name FROM "institution"
        JOIN "user"
        ON "user".inst_id = "institution".id
        WHERE "user".user_level = '2';`; 
    pool.query(query)
        .then(result => {
            console.log('inst GET', result.rows)
            res.send(result.rows)
        }).catch(err => {
            console.log('Institutions GET', err);
            res.sendStatus(500);
        })
})

// to get the institution related to the logged in researcher
router.get('/researchInst', (req, res) => {
  console.log('the user who is logged in is', req.user.id);
  const query = `SELECT "institution".name FROM "institution"
  JOIN "user"
  ON "institution".id = "user".inst_id
  WHERE "user".id = $1;`;
  pool.query(query,[req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in getting clinician list for researcher', err);
      res.sendStatus(500)
    })
});

module.exports = router;