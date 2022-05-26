const productsModel = require('../models/productsModel');

module.exports = {
  getAll: async () => {
    const result = await productsModel.getAll();
    return result;
  },
  getById: async (id) => {
    const result = await productsModel.getById(id);
    if (!result) throw new Error('Product not found');
    return result;
  },
};
