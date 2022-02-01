const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hexon",
    password: "viraj",
    port: 5432,
});

module.exports = pool;