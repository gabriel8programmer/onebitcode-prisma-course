const query = require("../database")

class Customer {
    constructor(rowCustomer) {
        this.id = rowCustomer.id
        this.name = rowCustomer.name
        this.email = rowCustomer.email
        this.createdAt = rowCustomer.created_at
        this.updatedAt = rowCustomer.updated_at
    }

    static async findAll() {
        const { rows } = await query(`SELECT * FROM customers;`)
        return rows.map(row => new Customer(row))
    }

    static async findById(id) {
        const { rows } = await query(`SELECT * FROM customers WHERE id = $1`, [id])
        if (!rows[0]) return null;
        return new Customer(rows[0])
    }

    static async create({ name, email }) {
        const { rows } = await query(
            `INSERT INTO customers (name, email) 
            VALUES ($1, $2)
            RETURNING *`, [name, email]
        )

        return new Customer(rows[0])
    }

    static async updateById(id, attributes) {
        const customer = await Customer.findById(id)
        if (!customer) return null;

        Object.assign(customer, attributes)

        const { name, email } = customer

        const { rows } = await query(`
            UPDATE customers SET
            name = $1,
            email = $2, 
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
        `, [name, email, id])

        return new Customer(customer)
    }

    static async deleteById(id) {
        const customer = await Customer.findById(id)
        if (!customer) return null;
        await query(`DELETE FROM customers WHERE id = $1`, [id])
        return { message: "Customer deleted with successfully!" }
    }
}

module.exports = Customer