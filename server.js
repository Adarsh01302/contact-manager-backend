const express = require('express');
const connectDB = require('./config/dbConnection.js');
const dotenv = require('dotenv').config() ;
const errorhandler = require('./middleware/errorHandler');
connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/contact" , require("./routes/contactRoute.js"));
app.use("/api/user" , require("./routes/userRoute.js"));

app.get("/", (req, res) => {
    res.status(200).json({message: 'Welcome to Contact API'});
});

app.use(errorhandler);


app.listen(PORT, () => {
  console.log(`Server iss running on http://localhost:${PORT}`);
});