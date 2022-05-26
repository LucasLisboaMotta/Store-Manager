const productsModel = require('../models/productsModel');
const error = require('../helpers/error');

module.exports = {
  getAll: async () => {
    const result = await productsModel.getAll();
    return result;
  },
  getById: async (req) => {
    const { id } = req.params;
    const result = await productsModel.getById(Number(id));
    if (!result) throw error(404, 'Product not found');
    return result;
  },
};
