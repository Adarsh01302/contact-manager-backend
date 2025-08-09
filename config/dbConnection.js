const mongose = require('mongoose');

const dbConnection = async () => {
    try {
        // console.log('Connecting to MongoDB...');
        // console.log(process.env.CONNECTION_STRING);
        const conn = await mongose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }    
}

module.exports = dbConnection;