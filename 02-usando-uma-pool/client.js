
const { Client } = require('pg')

const client = new Client({
    connectionString: 'postgresql://postgres:123@localhost:5432/postgres'
})

const openConnection = async () => {
    await client.connect()

    const result = await client.query('select 1 + 1 as soma')

    console.log(result.rows[0])

    setTimeout(() => {
        console.log('Fechando conexão.')
        client.end()
    }, 5000)
}

// mostra erro pois não podem ser 
// abertas duas conexões ao mesmo tempo com Client
openConnection()
openConnection()