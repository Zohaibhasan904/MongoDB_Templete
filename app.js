const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require('mongoose')


dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


// import routes
const userRoutes = require('./routes/user.routes')

// use routes 
app.use('/api/v1', userRoutes)
const MONGO_URI = process.env.MONGO_URI
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected!!!")
    })
    .catch(err => {
        console.log("Database connection error:", err.message)
        process.exit(1)
    });


app.listen(PORT, () =>
    console.log(` Server running on port http://localhost:${PORT}`)
);