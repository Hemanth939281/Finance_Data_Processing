import * as recordService from "./record.service.js";

// CREATE
export const create = async (req, res) => {
  try {
    const record = await recordService.createRecord(req.body, req.user._id);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET
export const getAll = async (req, res) => {
  try {
    const result = await recordService.getRecords(req.query);

    res.status(200).json({
      success: true,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      data: result.records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const record = await recordService.updateRecord(
      req.params.id,
      req.body,
      req.user._id,
    );

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    const record = await recordService.deleteRecord(req.params.id);

    res.status(200).json({
      success: true,
      message: "Record deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
