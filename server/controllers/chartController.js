 
const Transaction = require('../models/Transaction');

async function getBarChartData(req, res) {
  try {
    const { month } = req.query;
    
    // Generate bar chart data for the selected month
    const barChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
          },
        },
      },
      {
        $group: {
          _id: { $ceil: { $divide: ['$price', 100] } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          priceRange: {
            $concat: [
              { $toString: { $multiply: ['$_id', 100] } },
              ' - ',
              { $toString: { $add: [{ $multiply: ['$_id', 100] }, 99] } },
            ],
          },
          count: 1,
        },
      },
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    console.error('Error generating bar chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPieChartData(req, res) {
  try {
    const { month } = req.query;
    
    // Generate pie chart data for the selected month
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
          },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getBarChartData,
  getPieChartData,
};
