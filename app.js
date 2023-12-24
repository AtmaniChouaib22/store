require('dotenv').config();
require('express-async-errors'); 
const express = require('express')
const app = express(); 

const PORT = process.env.PORT || 3000
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')


//middleware to parse json data (payload) comming to the page
app.use(express.json())

//routes 
app.get('/', (req, res)=> {
    res.send('<h1>store page</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter);

//products route 
app.use(notFoundMiddleware)
app.use(errorMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`server listening on port${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start();