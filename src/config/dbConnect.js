const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,
            {
            useNewUrlParser: true,  // Corrected option
            useUnifiedTopology: true,
        });
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Error connecting to DB:', error.message);
    }
};

module.exports = dbConnect;
