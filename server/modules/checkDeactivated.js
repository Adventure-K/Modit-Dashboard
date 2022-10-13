const pool = require('../modules/pool');
const checkDeactivated = (username, req, res, next) => {
    console.log('heyyyyyyyyyyyyyy', );
    pool.query('SELECT * FROM "user" WHERE username = $1', [username])
}

module.exports = { checkDeactivated }