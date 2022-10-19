const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized2 } = require('../modules/authorization2-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.put('/:id', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {

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
