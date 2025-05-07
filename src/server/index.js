const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config();
const duckRoutes = require("./routes/ducks")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/ducks", duckRoutes)

console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(4000, () => console.log("Server on port 4000"))
  })
  .catch(console.error)
