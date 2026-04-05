import * as dashboardService from "./dashboard.service.js";

export const summary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const categoryTotals = async (req, res) => {
  try {
    const data = await dashboardService.getCategoryTotals();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const monthlyTrends = async (req, res) => {
  try {
    const data = await dashboardService.getMonthlyTrends();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const recent = async (req, res) => {
  try {
    const data = await dashboardService.getRecentRecords();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};