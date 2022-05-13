const express = require('express')
const path = require('path')
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
app.use('/api/entries', require('./routes/entryRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (_, res) => { res.sendFile(path.join(__dirname, '../frontend/build/index.html')) })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Something is wrong :)' })
  })
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))