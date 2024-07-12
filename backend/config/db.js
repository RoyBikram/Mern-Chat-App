const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongo Connected To ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error 11 ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
