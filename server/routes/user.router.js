const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { checkDeactivated } = require('../modules/checkDeactivated')
const { rejectUnauthorized2 } = require('../modules/authorization2-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  // console.log(req.user);
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const newUsername = req.body.credentials.username;
  const password = encryptLib.encryptPassword(req.body.credentials.password);
  const role = Number(req.body.credentials.role)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const selectedInstitution = req.body.selectedInstitution

      const queryText = `
      SELECT "id" FROM "institution"
      WHERE "name" = $1;
      `;

      pool.query(queryText, [selectedInstitution])
        .then(response => {
          let institutionId = response.rows[0].id
          // after the institution is retrieved from DB, user is then deposited into the DB

          const secondQueryText = `
          INSERT INTO "user" (username, password, first_name, last_name, inst_id, user_level)
          VALUES($1, $2, $3, $4, $5, $6);
          `;

          let queryValues = [
            newUsername,
            password,
            firstName,
            lastName,
            institutionId,
            role
          ]

          pool.query(secondQueryText, queryValues)
            .then(response => {
              res.sendStatus(201);
            })
            .catch(err => {
              console.log(err);
              res.sendStatus(500);
            })
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        })


});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
  
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/institutions', (req, res) => {
  // this route gets institutions from the DB to display for user registration
  let queryText = ` 
  SELECT "name" FROM "institution"
  ORDER BY "name" ASC;
  `

  pool.query(queryText)
    .then(response => {
      res.send(response.rows)
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    })
})

router.put('/updatePass', rejectUnauthenticated, rejectUnauthorized2, (req, res) => {
  // route to update user password
  const p = encryptLib.encryptPassword(req.body.pass);
  // encrypted password
  const id = req.body.id;
  const query = `
    UPDATE "user" SET password = $1
    WHERE id = $2;`;
  const values = [p, id]
  pool.query(query, values)
    .then(result => {
      res.sendStatus(200)
    }).catch(err => {
      console.log('password PUT', err);
      res.sendStatus(500);
    })
})

router.put('/retire/:id', (req, res) => {
  // route to retire clinicians and researchers
  const id = req.params.id
  const query = `
    UPDATE "user" SET "is_active" = false
    WHERE id = $1;`;
  pool.query(query, [id])
    .then(result => {
      res.sendStatus(200)
    }).catch(err => {
      console.log('retire user', err)
      res.sendStatus(500);
    })
})

router.put('/reinstate/:id', (req, res) => {
  // route to reinstate clinicians and researchers
  const id = req.params.id
  const query = `
    UPDATE "user" SET "is_active" = true
    WHERE id = $1;`;
  pool.query(query, [id])
    .then(result => {
      res.sendStatus(200)
    }).catch(err => {
      console.log('reinstate user', err)
      res.sendStatus(500);
    })
})


module.exports = router;
