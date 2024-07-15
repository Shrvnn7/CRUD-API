const Product = require('../models/Product')

const getProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).send(products)
    } catch(error){
        res.status(500).send(error)
    }
}

const getProduct =  async(req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(! product){
            return res.status(404).send()
        }
        res.status(200).send(product)
    } catch(error){
        res.status(500).send(error)
    }
}


const createProduct =  async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send(error);
    }
}


const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(! product){
            return res.status(404).send()
        }
        res.status(200).send(product)
    } catch(error){
        res.status(500).send(error)
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(! product){
            return res.status(404).send()
        }
        res.status(200).send(product)
    } catch(error){
        res.status(500).send(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct
}