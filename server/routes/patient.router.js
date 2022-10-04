const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
  console.log(req.params);
  const query = `SELECT * FROM "patient" WHERE id = $1;`;
  pool.query(query, [req.params.id])
    .then(response => {
      res.send(response.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})
/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log("in get router")
  const query = `SELECT * FROM "patient" WHERE clinician_id = $1;`;

  pool.query(query, [req.user.id])
    .then(response => {
      // console.log(response.rows);
      res.send(response.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  //TODO - need to get req.user.id!!!!
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
