const Order = require("../models/Order")

const ordersController = {
    //GET /orders
    index: async (req, res) => {
        const orders = await Order.findAll()
        res.json(orders)
    },

    //POST /orders
    save: async (req, res) => {
        const { customerId, products } = req.body
        const newOrder = await Order.create(customerId, products)

        if (!(newOrder instanceof Order)) {
            return res.status(400).json(newOrder)
        }

        res.status(201).json(newOrder)
    },

    //GET /orders:id
    show: async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (!order) return res.status(404).json("Order not found!")
        res.json(order)
    },

    //DELETE /orders:id
    delete: async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (!order) return res.status(404).json({ message: "Order not found!" })
        const result = await Order.deleleById(req.params.id)
        res.json(result)
    }
}

module.exports = ordersController