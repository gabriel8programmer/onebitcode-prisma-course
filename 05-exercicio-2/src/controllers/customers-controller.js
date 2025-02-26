const Customer = require("../models/Customers")

const customersController = {
    index: async (req, res) => {
        const customers = await Customer.findAll()
        res.json(customers)
    },

    show: async (req, res) => {
        const customer = await Customer.findById(req.params.id)
        if (!customer) return res.status(404).json({ message: "Customer not found!" })
        res.json(customer)
    },

    save: async (req, res) => {
        const newCustomer = await Customer.create(req.body)
        res.status(201).json(newCustomer)
    },

    update: async (req, res) => {
        const customerUpdated = await Customer.updateById(req.params.id, req.body)
        if (!customerUpdated) return res.status(404).json({ message: "Customer not found!" })
        res.json(customerUpdated)
    },

    delete: async (req, res) => {
        const result = await Customer.deleteById(req.params.id)
        if (!result) return res.status(404).json({ message: "Customer not found!" })
        res.json(result)
    }
}

module.exports = customersController