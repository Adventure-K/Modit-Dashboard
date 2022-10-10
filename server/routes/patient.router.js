const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this route gets patient data from the db of the patient that the clinician selects in the dropdown menu on the PatientDetailPage. Request comes from and response is returned to getPatientData() in patient.saga.js
router.get('/:id', (req, res) => {
  console.log(req.params);
  const query = `SELECT "patient".*, "session".* FROM "patient"
  JOIN "session"
  ON "patient".modit_id = "session".modit_id 
  WHERE "patient".id = $1;`;
  pool.query(query, [req.params.id])
    .then(response => {
      console.log('response.rows:', response.rows)

      res.send(response.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

//This route gets all patients attached to logged in clinician to populate dropdown menu on PatientDetailPage. Request comes from and response is returned to getPatients() in patient.saga.js
router.get('/', (req, res) => {
  console.log("in get router")
  const query = `SELECT * FROM "patient" WHERE clinician_id = $1;`;

  pool.query(query, [req.user.id])
    .then(response => {
      console.log(response.rows);
      res.send(response.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

// this route posts a new patient to the db from the AddPatientFormPage and sends back a 200 status. Request comes from and response is returned to addPatient() in patient.saga.js
router.post('/', (req, res) => {
  console.log("in patient router", req.body, req.user);
  const query = `INSERT INTO "patient" ("first_name", "last_name", "email", "modit_id", "clinician_id")
  VALUES ($1, $2, $3, $4, $5);`;
  pool.query(query, [req.body.firstName, req.body.lastName, req.body.email, req.body.patientId, req.user.id])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

// This query effectively deletes a patient from the clinician view by setting the is_active column in "patient" to false. Patient is not deleted from db. Request comes from and response is returned to deactivatePatient() in patient.saga.js
router.put('/:id', (req, res) => {
  console.log('in put router', req.params.id)
  const query = `UPDATE "patient" SET is_active = 'false'
                 WHERE id = $1;`;
  pool.query(query, [req.params.id])
    .then(response => {
      console.log('deleted');
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

module.exports = router;
