const express = require('express')
const PORT = process.env.PORT || 5000
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

// // Connect to Database
connectDB()

const app = express()

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => { res.status(200).json({ message: ':)' }) })

app.use('/api/entries', require('./routes/entryRoutes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))