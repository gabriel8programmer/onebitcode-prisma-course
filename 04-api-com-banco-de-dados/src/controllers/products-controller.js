const Product = require("../models/Product")

const productsController = {
    //GET /products
    index: async (req, res) => {
        const products = await Product.findAll()
        res.json(products)
    },

    //GET /products/:id
    show: async (req, res) => {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: "Product not found!" })

        res.json(product)
    },

    //POST /products
    save: async (req, res) => {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    },

    //PUT /products/:id
    update: async (req, res) => {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: "Product not found!" })

        const productUpdated = await Product.updateById(id, req.body);
        res.json(productUpdated)
    },

    //DELETE /products/:id
    delete: async (req, res) => {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: "Product not found!" })

        await Product.deleteById(id)
        res.json({ message: "Produto exluído!" })
    }
}

module.exports = productsController