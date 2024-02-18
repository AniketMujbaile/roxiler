 
const axios = require('axios');

async function getCombinedData(req, res) {
  try {
    const { month } = req.query;

    // Fetch data from all APIs
    const initializeResponse = await axios.get(`http://localhost:3000/api/transactions/initialize-database`);
    const transactionsResponse = await axios.get(`http://localhost:3000/api/transactions/?month=${month}`);
    const statisticsResponse = await axios.get(`http://localhost:3000/api/statistics/?month=${month}`);
    const barChartResponse = await axios.get(`http://localhost:3000/api/chart/bar-chart/?month=${month}`);
    const pieChartResponse = await axios.get(`http://localhost:3000/api/chart/pie-chart/?month=${month}`);

    // Combine responses
    const combinedData = {
      initializeResponse: initializeResponse.data,
      transactionsResponse: transactionsResponse.data,
      statisticsResponse: statisticsResponse.data,
      barChartResponse: barChartResponse.data,
      pieChartResponse: pieChartResponse.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getCombinedData,
};
