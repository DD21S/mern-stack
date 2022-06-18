require("dotenv").config()

const express = require("express")
const workouts = require("./routes/workouts")

// Express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workouts)

// Listen for request
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})