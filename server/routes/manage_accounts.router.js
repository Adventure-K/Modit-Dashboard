const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('in getUsers', req.user.id);
  const query = `SELECT * FROM "user" WHERE inst_id = $1;`;
  pool.query(query, [req.user.inst_id])
    .then(result => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  // GET route code here
});

/**
 * POST route template
 */
router.put('/', (req, res) => {
  console.log('in manage accounts put', req.body);
  let query;
  // let id;

  if (req.body.userLevel == 1) {
    query = `UPDATE "user" SET user_level = '2' WHERE id = $1;`;
  } else if (req.body.userLevel == 2) {
    query = `UPDATE "user" SET user_level = '1' WHERE id = $1;`;
  }
  pool.query(query, [req.body.id])
    .then(response => {
      res.sendStatus(200)
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  // POST route code here
});

module.exports = router;
