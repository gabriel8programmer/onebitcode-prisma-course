
const { Pool } = require("pg")

const pool = new Pool({
    connectionString: "postgresql://postgres:123@localhost:5432/node_postgres"
})

const query = async (queryString, params, callback) => {
    return await pool.query(queryString, params, callback)
}

module.exports = query