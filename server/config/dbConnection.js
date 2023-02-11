const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', true);

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connection established.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = dbConnection;
