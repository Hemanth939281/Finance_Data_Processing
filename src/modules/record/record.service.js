import Record from "../../models/Record.js";

// creating record
export const createRecord = async (data, userId) => {
  const { amount, type, category, date, notes } = data;

  if (!amount || amount < 0) {
    throw new Error("invalid amount");
  }

  if (!category) {
    throw new Error("invalid category");
  }

  if(!["income", "expense"].includes(type)){
    throw new Error("invalid type");
  }
    if (!date || isNaN(new Date(date).getTime())) {
    throw new Error("invalid date");
  }


  const record = await Record.create({
    amount,
    type: type.toLowerCase(),
    category: category.toLowerCase().trim(),
    date: new Date(date),
    notes,
    createdBy: userId,
  });

  return record;
};

// GET (with filtering)
export const getRecords = async (queryParams) => {
  const {
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 5,
  } = queryParams;

  let query = { isDeleted: false };

  if (type) {
    query.type = type;
  }

  if (category) {
    query.category = category;
  }

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const limitNum = Math.min(50, parseInt(limit));
  let skip = (page - 1) * limitNum;

  const records = await Record.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limitNum))
    .populate("createdBy", "name email");

  const total = await Record.countDocuments(query);

  return {
    total,
    page: Number(page),
    limit: Number(limitNum),
    totalPages: Math.ceil(total / limitNum),
    records,
  };
};

// update record

export const updateRecord = async (id, data, userId) => {
  const record = await Record.findById(id);

  if (!record || record.isDeleted) {
    throw new Error("Record not found");
  }

  Object.assign(record, data);
  record.updatedBy = userId;

  await record.save();

  return record;
};

// DELETE (SOFT DELETE)
export const deleteRecord = async (id) => {
  const record = await Record.findById(id);

  if (!record || record.isDeleted) {
    throw new Error("Record not found");
  }

  record.isDeleted = true;
  await record.save();

  return record;
};
