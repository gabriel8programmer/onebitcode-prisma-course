const query = require("../database")

class Product {
    constructor(productRow) {
        this.id = productRow.id
        this.name = productRow.name
        this.description = productRow.description
        this.price = +productRow.price
        this.stockQuantity = productRow.stock_quantity
        this.isActive = productRow.is_active
        this.createdAt = new Date(productRow.created_at)
        this.updatedAt = new Date(productRow.updated_at)
    }

    static async findAll() {
        const result = await query(`SELECT * FROM products`)
        return result.rows.map((row) => new Product(row))
    }

    static async findById(id) {
        const result = await query(`SELECT * FROM products WHERE id = $1`, [id])
        if (result.rows[0]) {
            return new Product(result.rows[0])
        }
        return null
    }

    static async create({ name, description, price, stockQuantity, isActive }) {
        const result = await query(
            `INSERT INTO products (
            name, description, price, stock_quantity, is_active
            ) VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name, description, price, stockQuantity, isActive]
        )

        return new Product(result.rows[0])
    }

    static async updateById(id, attributes) {
        const product = await Product.findById(id)
        Object.assign(product, attributes)
        product.updatedAt = new Date()

        const { name, description, price, stockQuantity, isActive, updatedAt } = product

        const result = await query(`UPDATE products SET
            name = $1,
            description = $2,
            price = $3,
            stock_quantity = $4,
            is_active = $5,
            updated_at = $6
            WHERE id = $7
            RETURNING *
        `, [name, description, price, stockQuantity, isActive, updatedAt, id])

        return new Product(result.rows[0])
    }

    static async deleteById(id) {
        await query(`DELETE FROM products WHERE id = $1`, [id])
    }

}

module.exports = Product