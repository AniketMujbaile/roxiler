 
const Transaction = require('../models/Transaction');

async function getStatistics(req, res) {
  try {
    const { month } = req.query;
    
    // Calculate statistics for the selected month
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
          totalSoldItems: { $sum: 1 },
          totalNotSoldItems: {
            $sum: {
              $cond: [{ $eq: ['$isSold', false] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalSoldItems : 0,
      totalNotSoldItems: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalNotSoldItems : 0,
    });
  } catch (error) {
    console.error('Error calculating statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getStatistics,
};
