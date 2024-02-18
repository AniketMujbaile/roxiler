 
const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const chartRoutes = require('./routes/chartRoutes');
const combinedDataRoutes = require('./routes/combinedDataRoutes');
const mongoDB = require('./config/mongoose')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware function
function logger(req, res, next) {
    console.log('Logging...');
    next();  
  }
  
 app.use(logger);

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/chart', chartRoutes);
app.use('/api/combined-data', combinedDataRoutes);
 
mongoDB.then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
} ).catch((error) => {
    console.log("Error in connecting to DB!")
})