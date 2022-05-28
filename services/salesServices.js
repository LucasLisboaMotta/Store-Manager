const salesModel = require('../models/salesModel');
const error = require('../helpers/error');

module.exports = {
  getAll: async () => {
    const result = await salesModel.getAll();
    return result;
  },
  getById: async (req) => {
    const { id } = req.params;
    const result = await salesModel.getById(id);
    if (result.length === 0) throw error(404, 'Sale not found');
    return result;
  },
  post: async (req) => {
    const { body } = req;
    const id = await salesModel.postNewSale();
    body.forEach((element) => salesModel.postSaleProduct(element, id));
    return { id, itemsSold: body };
  },
  put: async (req) => {
    const { body, params: { id } } = req;
    const result = await salesModel.getById(id);
    if (result.length === 0) throw error(404, 'Sale not found');
    await salesModel.deleteSaleProduct(id);
    body.forEach((element) => salesModel.postSaleProduct(element, id));
    return { saleId: id, itemUpdated: body };
  },
  delete: async (req) => {
    const { params: { id } } = req;
    const result = await salesModel.getById(id);
    if (result.length === 0) throw error(404, 'Sale not found');
    await salesModel.deleteSaleProduct(id);
    await salesModel.deleteSales(id);
  },
};
