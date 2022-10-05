const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.put('/:id', (req, res) => {
  console.log('in router put', req.params);
  const query = `UPDATE "user" SET is_approved = true WHERE id = $1;`;

  pool.query(query, [req.params.id])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
  // console.log('in deleteRequest', req.params)  // POST route code here
  const query = `DELETE FROM "user" WHERE id = $1;`;
  pool.query(query, [req.params.id])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

module.exports = router;
