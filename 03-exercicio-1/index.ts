import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:123@localhost:5432/db_events",
});

interface IEvent {
  id: number;
  name: string;
  eventDate: Date;
  totalTickets: number;
  ticketsSold: number;
}

// Uma função que cria uma tabela de eventos com as colunas
// id, nome, data do evento, total de ingressos e ingressos vendidos.
const createEventTable = async () => {
  const client = await pool.connect();

  const query = `
    DROP TABLE IF EXISTS events;
    CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        event_date DATE NOT NULL,
        total_tickets INT NOT NULL,
        tickets_sold INT NOT NULL
    );`;

  await pool.query(query);

  client.release();
};

// Uma função que cria um novo evento, salvando-o no banco de dados.
const createNewEvent = async (attributes: Omit<IEvent, "id">) => {
  const client = await pool.connect();

  const query = `INSERT INTO events 
    (name, event_date, total_tickets, tickets_sold) 
    VALUES ($1, $2, $3, $4)`;

  const { name, eventDate, totalTickets, ticketsSold } = attributes;
  await pool.query(query, [name, eventDate, totalTickets, ticketsSold]);

  setTimeout(() => {
    console.log(`Evento '${name}' adcionado a base de dados!`);
    client.release();
  }, 2000);
};

// Uma função que obtém todos os eventos salvos no banco de dados.
const getAllEvents = async () => {
  const client = await pool.connect();

  const query = `SELECT * FROM events;`;
  const result = await pool.query(query);

  console.log("Todos os eventos");
  console.table(result.rows);

  client.release();

  const events: IEvent[] = result.rows;
  return events;
};

// Uma função que obtém as informações de um evento a partir do seu nome.
const getEventByName = async (name: string) => {
  const client = await pool.connect();

  const query = `SELECT * FROM events WHERE name = $1`;
  const result = await pool.query(query, [name]);

  client.release();

  console.log(`Dados do Evento '${name}'`);
  console.table(result.rows);

  const event: IEvent = result.rows[0];

  return event;
};

// Uma função que obtém os eventos de um determinado dia;
const getEventsByDate = async (date: Date) => {
  const client = await pool.connect();

  const query = `SELECT * FROM events WHERE event_date = $1`;
  const result = await pool.query(query, [date]);

  client.release();

  console.log(`Eventos da Data ${date.toLocaleDateString()}`);
  console.table(result.rows);
  return result.rows;
};

// Uma função que realiza a venda de um ingresso, ou seja,
// adiciona +1 aos ingressos vendidos. A venda só poderá ser executada
//  se o número de ingressos vendidos não exceder o total de ingressos
// e se o evento ainda não aconteceu.
const sellTicket = async (name: string) => {
  const client = await pool.connect();

  const event = await getEventByName(name);

  const query = `UPDATE events 
    SET tickets_sold = tickets_sold+1 
    WHERE id = $1 AND tickets_sold < total_tickets;
  `;

  const result = await pool.query(query, [event.id]);

  if (result.rowCount && result.rowCount > 0) {
    console.log(`Ingresso para o evento '${event.name}' vendido com sucesso!`);
    return;
  }

  console.log("Ingressos Esgotados!");

  client.release();
};

// Obs.: Para testar as funções você pode utilizar um script
// ou o próprio console interativo do Node.js.

// CREATE TABLE AND INSERT VALUES
createEventTable().then(() => {
  createNewEvent({
    name: "Evento 1",
    eventDate: new Date(2025, 3, 20),
    totalTickets: 1000,
    ticketsSold: 999,
  });

  createNewEvent({
    name: "Evento 2",
    eventDate: new Date(2025, 3, 20),
    totalTickets: 1000,
    ticketsSold: 999,
  });

  createNewEvent({
    name: "Evento 3",
    eventDate: new Date(2025, 4, 25),
    totalTickets: 1000,
    ticketsSold: 999,
  });

  createNewEvent({
    name: "Evento 4",
    eventDate: new Date(2025, 4, 25),
    totalTickets: 1000,
    ticketsSold: 980,
  });

  createNewEvent({
    name: "Evento 5",
    eventDate: new Date(2025, 4, 25),
    totalTickets: 1000,
    ticketsSold: 500,
  });

  getAllEvents();
  getEventByName("Evento 2");
  getEventsByDate(new Date(2025, 4, 25));

  // SELL TWO TICKETS
  sellTicket("Evento 2").then(() => {
    sellTicket("Evento 2").then(() => {
      getEventByName("Evento 2");
    });
  });
});
