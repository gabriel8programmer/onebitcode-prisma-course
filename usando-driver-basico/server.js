
const pg = require('pg')

// Connection String: protocolo_bd://usuario:senha@host:porta/nome_do_banco?parametros=

// connect with database
const db = new pg.Client({
    connectionString: 'postgresql://postgres:123@localhost:5432/node_postgres'
})

const createTable = async () => {
    await db.connect();

    const query = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL, 
            password VARCHAR(20) NOT NULL
        );
    `

    await db.query(query);

    await db.end();
}

const selectUsers = async () => {
    await db.connect()

    const query = `SELECT * FROM users;`
    const results = await db.query(query);
    console.table(results.rows);

    await db.end();
}

const insertUser = async (name, password) => {
    await db.connect();

    const query = `
        INSERT INTO users (name, password) VALUES ($1, $2);
    `
    await db.query(query, [name, password]);

    await db.end();
}




