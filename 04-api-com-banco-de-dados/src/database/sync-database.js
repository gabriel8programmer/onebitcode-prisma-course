
const query = require(".")

const syncDatabase = async () => {
    const queryString = `
        DROP TABLE IF EXISTS products;
        CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(255),
            price DECIMAL(10, 2) NOT NULL,
            stock_quantity INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
        );
    `

    await query(queryString)

    console.log("Create 'Products' table!")
    process.exit(0)
}

syncDatabase()
