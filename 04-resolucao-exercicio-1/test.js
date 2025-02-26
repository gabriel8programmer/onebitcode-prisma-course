const { createEvent, getAllEvents, getEventByName, getEventsByDate, sellTicket } = require("./functions")

const test = async () => {
    // await createEvent("Evento 1", new Date("2025-12-20"), 100)
    // await createEvent("Evento 2", new Date("2024-12-20"), 100)
    // await createEvent("Evento 3", new Date("2025-03-30"), 100)

    // await createEvent("Evento 4", new Date("2025-03-30"), 100)
    // await createEvent("Evento 5", new Date("2025-03-30"), 100)
    // await createEvent("Evento 6", new Date("2025-03-30"), 100)
    // await createEvent("Evento 7", new Date("2025-03-30"), 100)


    // const events = await getAllEvents()
    // console.table(events)

    // const event = await getEventByName("Evento 2")

    // console.table(event)

    // const events = await getEventsByDate(new Date("2025-03-30"))
    // console.table(events)

    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)
    await sellTicket(1)

    process.exit(0);
}

test();