const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => { // Get all institutions
    const query = `
        SELECT * FROM "institutions`
        pool.query(query)
})