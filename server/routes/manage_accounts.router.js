const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized2 } = require('../modules/authorization2-middleware');
const { rejectUnauthorized3 } = require('../modules/authorization3-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// receives request to get all users from manage_users.saga. Queries the db to get all users with the same institution id (inst_id) as the one attached to the user who made the request (req.user.id)
// This route governs requests by research heads to manage their users. 
router.get('/', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {

  const query = `SELECT * FROM "user" WHERE inst_id = $1 ORDER BY first_name ASC;`;
  pool.query(query, [req.user.inst_id])
    .then(result => {

      res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

// This route is similar to the one above but governs requests by admins to manage all users.
router.get('/admin/:id', rejectUnauthenticated, rejectUnauthorized3, (req, res) => {

  const query = `SELECT * FROM "user" WHERE inst_id = $1;`;
  pool.query(query, [req.params.id])
    .then(result => {

      res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

// receives request from manage_users.saga. If the click-on user is a research head (user_level 2), the query to demote them to researcher (user_level 1) will run. If the clicked-on user is a researcher (user_level 1), the query to promote them to research head will run.
router.put('/', rejectUnauthenticated, rejectUnauthorized3, async (req, res) => {

  const connection = await pool.connect();

  if (req.body.userLevel == 1) {
    try {
      await connection.query('BEGIN');
      const query1 = `UPDATE "user" SET user_level = '2' WHERE id = $1;`;
      await connection.query(query1, [req.body.id])
      const query2 = `
        UPDATE "institution"
        SET "rh_id" = $1 FROM "user"
        WHERE "institution".id = "user".inst_id
        AND "user".id = $1;`
      await connection.query(query2, [req.body.id])
      await connection.query('COMMIT')
      res.sendStatus(200);
    } catch (err) {
      await connection.query('ROLLBACK');
      // console.log('promote user', err)
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  } else if (req.body.userLevel == 2) {
    try {
      await connection.query('BEGIN');
      const query1 = `UPDATE "user" SET user_level = '1' WHERE id = $1;`;
      await connection.query(query1, [req.body.id])
      const query2 = `
          UPDATE "institution"
          SET "rh_id" = NULL FROM "user"
          WHERE "institution".id = "user".inst_id
          AND "user".id = $1;`
      await connection.query(query2, [req.body.id])
      await connection.query('COMMIT')
      res.sendStatus(200);
    } catch (err) {
      await connection.query('ROLLBACK');
      console.log('promote user', err)
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  }
});

//this query reactivates the account of a clinician or researcher by changing the is_active column in the "user" table to "true".
router.put('/reinstate', (req, res) => {

  query = `UPDATE "user" SET "is_active" = 'true'
          WHERE "user".id = $1;`;
  pool.query(query, [req.body.id])
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('reinstate user query error', err);
      res.sendStatus(500);
    })
})

module.exports = router;
