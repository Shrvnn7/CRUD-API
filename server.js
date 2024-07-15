const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoutes = require('./routes/product')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/crud-api')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.use('/api/products', productRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
