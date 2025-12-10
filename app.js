const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


// import routes
const userRoutes = require('./routes/user.routes')

// use routes 
app.use('/api/v1', userRoutes)

// Database connection + server start
connectDB()
    .then(() => {
        console.log(" MongoDB Connected");

    })
    .catch((error) => {
        console.error(" MongoDB connection failed:", error.message);
        process.exit(1);
    });


app.listen(PORT, () =>
    console.log(` Server running on port http://localhost:${PORT}`)
);