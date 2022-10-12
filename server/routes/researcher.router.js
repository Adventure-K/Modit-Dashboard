const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized1 } = require('../modules/authorization1-middleware');
const { rejectUnauthorized3 } = require('../modules/authorization3-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// this GET route is to get all clinicians associated with a researcher and institution

router.get('/clinicians', rejectUnauthenticated, rejectUnauthorized1,(req, res) => {
  console.log('in get clinicians', req.user)
  const query = `SELECT * FROM "user"
  WHERE inst_id = $1 AND user_level = 0 AND is_approved = TRUE
  ORDER BY first_name ASC;`;
  // pool.query(query, [req.user.id])
  pool.query(query, [req.user.inst_id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in getting clinician list for researcher', err);
      res.sendStatus(500)
    })
});

router.get('/cliniciansAdmin/:id', rejectUnauthenticated, rejectUnauthorized3,(req, res) => {
  console.log('in get clinicians for admin. Inst:', req.params.id)
  const query = `SELECT * FROM "user"
  WHERE inst_id = $1 AND user_level = 0 AND is_approved = TRUE
  ORDER BY first_name ASC;`;
  // pool.query(query, [req.user.id])
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in getting clinician list for researcher', err);
      res.sendStatus(500)
    })
});

// this GET route is to get all clinicians associated with a researcher and institution
router.get('/teamData', rejectUnauthenticated, rejectUnauthorized1,(req, res) => {
  const query = `
    SELECT AVG("proportionOfGazeTimeOnDrugs") AS "drugs", AVG("proportionOfGazeTimeOnNonDrugs") AS "noDrugs", AVG("proportionOfGazeTimeOnBack") AS "back" FROM "session"
    JOIN "patient"
    ON "patient".modit_id = "session".modit_id
    JOIN "user"
    ON "user".id = "patient".clinician_id
    WHERE "user".inst_id = $1;`;
    pool.query(query, [req.user.inst_id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('Error in getting team data for researcher', err);
        res.sendStatus(500)
      })
  });

  router.get('/teamDataAdmin/:id', rejectUnauthenticated, rejectUnauthorized3,(req, res) => {
    console.log('in team data admin GET')
    const query = `
      SELECT AVG("proportionOfGazeTimeOnDrugs") AS "drugs", AVG("proportionOfGazeTimeOnNonDrugs") AS "noDrugs", AVG("proportionOfGazeTimeOnBack") AS "back" FROM "session"
      JOIN "patient"
      ON "patient".modit_id = "session".modit_id
      JOIN "user"
      ON "user".id = "patient".clinician_id
      WHERE "user".inst_id = $1;`;
      pool.query(query, [req.params.id])
        .then(result => {
          res.send(result.rows);
        })
        .catch(err => {
          console.log('Error in getting team data (admin) for researcher', err);
          res.sendStatus(500)
        })
    });

//GET route for researcher clinicians
router.get('/researcherTeam/:id', rejectUnauthenticated, rejectUnauthorized1, (req, res) => {
 
  const query = `SELECT * FROM "patient" WHERE clinician_id = $1;`;

  pool.query(query, [req.params.id])
    .then(response => {
      console.log(response.rows);
      res.send(response.rows);
    }).catch(err => {
      console.log('Error in GETting clinician data', err);
      res.sendStatus(500);
    })
});

// to get the institution related to the logged in researcher
router.get('/researchInst', rejectUnauthenticated, (req, res) => {
    console.log('the user who is logged in is', req.user.id);
    const query = `
    SELECT "institution".name FROM "institution"
    JOIN "user"
    ON "institution".id = "user".inst_id
    WHERE "user".id = $1;
    `;
    pool.query(query,[req.user.id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('Error in getting institution for researcher', err);
        res.sendStatus(500)
      })
  });

  router.get('/researchInstAdmin/:id', rejectUnauthenticated, (req, res) => {
    console.log('institution queried:', req.params.id);
    const query = `
    SELECT "institution".name FROM "institution"
    JOIN "user"
    ON "institution".id = "user".inst_id
    WHERE "user".id = $1;
    `;
    pool.query(query,[req.params.id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('Error in getting institution for researcher', err);
        res.sendStatus(500)
      })
  });




module.exports = router