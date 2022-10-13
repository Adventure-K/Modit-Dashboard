const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized2 } = require('../modules/authorization2-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.put('/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {
  console.log('in approve_users router put', req.params);
  const query = `UPDATE "user" SET is_approved = true WHERE id = $1;`;

  pool.query(query, [req.params.id])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('approve users router put', err);
      res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {
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

router.put('/admin/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {
  console.log('in approve_users admin router put', req.params);
  const query = `UPDATE "user" SET is_approved = true WHERE id = $1;`;

  pool.query(query, [req.params.id])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('approve users admin router put', err);
      res.sendStatus(500);
    })
});

router.delete('/admin/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {
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
