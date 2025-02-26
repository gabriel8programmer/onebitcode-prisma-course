const { query } = require("./database");

async function createTable() {
    await query(`
    DROP TABLE IF EXISTS events;
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      event_date DATE NOT NULL,
      total_tickets INT NOT NULL,
      tickets_sold INT DEFAULT 0
    );
  `);
    console.log("Events table created successfully");

    process.exit(0)
}

createTable();