import Record from "../../models/Record.js";

export const getSummary = async () => {
  const result = await Record.aggregate([
    { $match: { isDeleted: false } },

    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  result.forEach(item => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense
  };
};

export const getCategoryTotals = async () => {
  return await Record.aggregate([
    { $match: { isDeleted: false } },

    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },

    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0
      }
    }
  ]);
};


export const getMonthlyTrends = async () => {
  return await Record.aggregate([
    { $match: { isDeleted: false } },

    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
};

export const getRecentRecords = async () => {
  return await Record.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("createdBy", "name email");
};