const salesModel = require('../models/salesModel');
const error = require('../helpers/error');

module.exports = {
  getAll: async () => {
    const result = await salesModel.getAll();
    return result;
  },
  getById: async (req) => {
    const { id } = req.params;
    const result = await salesModel.getById(Number(id));
    if (result.length === 0) throw error(404, 'Sale not found');
    return result;
  },
  post: async (req) => {
    const { body } = req;
    const id = await salesModel.postNewSale();
    body.forEach((element) => salesModel.postSaleProduct(element, id));
    return { id, itemsSold: body };
  },
};
