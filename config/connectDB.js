const mongoose = require("mongoose");

const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE_URI)
        mongoose.set("strictQuery",true)
    } catch (error) {
        console.error(error);
    }
}
module.exports=connectDB