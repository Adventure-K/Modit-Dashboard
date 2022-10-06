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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
