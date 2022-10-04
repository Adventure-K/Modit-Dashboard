const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // Send back user object from the session (previously queried from the database)
  console.log(req.user);
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log(req.body);
  const username = req.body.credentials.username;
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
    console.log(response.rows[0]);
    let institutionId = response.rows[0].id

    const secondQueryText = `
    INSERT INTO "user" (username, password, first_name, last_name, inst_id, user_level)
    VALUES($1, $2, $3, $4, $5, $6);
    `;

    let queryValues = [
      username,
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

  // const queryText = `INSERT INTO "user" (username, password)
  //   VALUES ($1, $2) RETURNING id`;
  // pool
  //   .query(queryText, [username, password])
  //   .then(() => res.sendStatus(201))
  //   .catch((err) => {
  //     console.log('User registration failed: ', err);
  //     res.sendStatus(500);
  //   });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('LOGGING IN');
  res.sendStatus(200);

});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/institutions', (req, res) => {
  let queryText = `
  SELECT "name" FROM "institution"
  ORDER BY "name" ASC;
  `

  pool.query(queryText)
  .then(response => {
    // console.log(response.rows);
    res.send(response.rows)
  })
  .catch(err => {
    console.log(err);
  res.send(500);
  })
})

module.exports = router;
