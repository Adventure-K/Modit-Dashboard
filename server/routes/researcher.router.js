const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized1 } = require('../modules/authorization1-middleware');
const { rejectUnauthorized3 } = require('../modules/authorization3-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Dispatch: FETCH_CLINICIANS // From researcher.saga.js function fetchClinicians
// this GET route is to get all clinicians associated with the user's institution 
router.get('/clinicians', rejectUnauthenticated, rejectUnauthorized1, (req, res) => {

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

// Dispatch: FETCH_CLINICIANS_ADMIN // From researcher.saga.js function fetchCliniciansAdmin
// this GET route is to get all clinicians associated with the institution selected by an admin user
router.get('/cliniciansAdmin/:id', rejectUnauthenticated, rejectUnauthorized3, (req, res) => {

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

// Dispatch: FETCH_TEAM_DATA // From researcher.saga.js function fetchTeamData
// this GET route is to get all clinicians associated with the user's institution
router.get('/teamData', rejectUnauthenticated, rejectUnauthorized1, (req, res) => {
  const query = `
    SELECT CAST(AVG("proportionOfGazeTimeOnDrugs") AS DECIMAL(3,2))AS "drugs", CAST(AVG("proportionOfGazeTimeOnNonDrugs") AS DECIMAL(3,2)) AS "noDrugs", CAST(AVG("proportionOfGazeTimeOnBack") AS DECIMAL(3,2)) AS "back" FROM "session"
    JOIN "patient"
    ON "patient".modit_id = "session".modit_id
    JOIN "user"
    ON "user".id = "patient".clinician_id
    WHERE "user".inst_id = $1;`;
  pool.query(query, [req.user.inst_id])
    .then(result => {
      console.log(result.rows[0]);

      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in getting team data for researcher', err);
      res.sendStatus(500)
    })
});

// Dispatch: FETCH_TEAM_DATA_ADMIN // From researcher.saga.js function fetchTeamDataAdmin
// this GET route is to get all clinicians associated with the institution selected by an admin user
router.get('/teamDataAdmin/:id', rejectUnauthenticated, rejectUnauthorized3, (req, res) => {
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

// Dispatch: FETCH_RESEARCHER_INST // From researcher.saga.js function fetchResearcherInst
// to get the institution related to the logged in researcher
router.get('/researchInst', rejectUnauthenticated, (req, res) => {
  console.log('the user who is logged in is', req.user.id);
  const query = `
    SELECT "institution".name FROM "institution"
    JOIN "user"
    ON "institution".id = "user".inst_id
    WHERE "user".id = $1;
    `;
  pool.query(query, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in getting institution for researcher', err);
      res.sendStatus(500)
    })
});

// Dispatch: FETCH_RESEARCHER_INST_ADMIN // From researcher.saga.js function fetchResearcherInstAdmin
// Retrieves institution info for selected researcher on admin request
router.get('/researchInstAdmin/:id', rejectUnauthenticated, (req, res) => {
  console.log('institution queried:', req.params.id);
  const query = `
    SELECT "institution".name FROM "institution"
    JOIN "user"
    ON "institution".id = "user".inst_id
    WHERE "user".id = $1;
    `;
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in getting institution for researcher', err);
      res.sendStatus(500)
    })
});

// Dispatch: FETCH_TEAM_DATA // From researcher.saga.js function fetchTeamData
// Retrieves all patient data for the given research team
router.get('/allSessionData', rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT "session_id", session."modit_id",
    "proportionOfGazeTimeOnDrugs",
    "proportionOfGazeTimeOnNonDrugs",
    "proportionOfGazeTimeOnBack" FROM "session"
    JOIN "patient"
      ON "patient".modit_id = "session".modit_id
      JOIN "user"
      ON "user".id = "patient".clinician_id
      WHERE "user".inst_id = $1;
    ;`;
  pool.query(query, [req.user.inst_id])
    .then(response => {
      // console.log(response.rows);
      res.send(response.rows)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })

})



module.exports = router