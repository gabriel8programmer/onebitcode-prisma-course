const { Pool } = require('pg')

const pool = new Pool({
    connectionString: 'postgres://postgres:123@localhost:5432/postgres'
})

const openConnection = async () => {

    const client = await pool.connect()

    const result = await pool.query(`SELECT 1 + 1 AS soma`)
    console.log(result.rows[0])

    setTimeout(() => {
        client.release()
        console.log('Fechando conexão!')
    }, 1000)
}

// agora vai funcionar pois o pool de conexão
//  permite fazer muitas conexões simultaneamente
openConnection()
openConnection()
openConnection()
openConnection()
openConnection()