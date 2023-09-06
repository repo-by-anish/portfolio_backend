require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const erroHandle = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500
const app = express();

connectDB();
app.use(cors(corsOptions))
app.use(erroHandle)
app.use(express.json());
app.use(logger);
app.use("/",require("./routes/root"))
app.use("/message",require("./routes/messageRoute"))

mongoose.connection.once("open",()=>{
    console.log("connected to DB");
    app.listen(PORT, (e) => {
        if (!e) {
            console.log(`Connected to PORT: ${PORT}`);
        }
    })
})
mongoose.connection.on("error",(err)=>{
    console.log(err);
})
