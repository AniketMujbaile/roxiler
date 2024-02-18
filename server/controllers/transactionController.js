 
const axios = require('axios');

async function initializeDatabase(req, res) {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    // Initialize your database with the fetched data
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function listTransactions(req, res) {
  try {
     res.status(200).json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  initializeDatabase,
  listTransactions,
};
