const salesModel = require('../models/salesModel');

module.exports = {
  getAll: async () => {
    const result = await salesModel.getAll();
    return result;
  },
  getById: async (id) => {
    const result = await salesModel.getById(id);
    if (result.length === 0) throw new Error('Sale not found');
    return result;
  },
};
