const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log("in get router")
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  //TODO - need to get req.user.id!!!!
  console.log("in patient router", req.body, req.user);
  const query = `INSERT INTO "patient" ("first_name", "last_name", "email", "id")
  VALUES ($1, $2, $3, $4);`;
  pool.query(query, [req.body.firstName, req.body.lastName, req.body.email, req.body.patientId])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

module.exports = router;
