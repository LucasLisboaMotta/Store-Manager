const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const error = require('../helpers/error');

const valitySale = async (element) => {
  const getAllQuantityComparation = await element.map(async ({ quantity, productId }) => {
    const { quantity: prevQuantity } = await productsModel.getById(productId);
    if (prevQuantity < quantity) return true;
    return false;
  });
  const resolvePromiseComparation = await Promise.all(getAllQuantityComparation);
  return resolvePromiseComparation.some((bool) => bool);
}; 

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
    const verify = await valitySale(body);
    console.log('verify', verify);
    if (verify) throw error(422, 'Such amount is not permitted to sell');
    body.forEach((element) => {
      salesModel.postSaleProduct(element, id);
      productsModel.subtractQuantity(element);
    });
    return { id, itemsSold: body };
  },
  put: async (req) => {
    const { body, params: { id } } = req;
    const result = await salesModel.getById(id);
    if (result.length === 0) throw error(404, 'Sale not found');
    await salesModel.deleteSaleProduct(id);
    result.forEach((element) => productsModel.sumQuantity(element));
    body.forEach((element) => {
      salesModel.postSaleProduct(element, id);
      productsModel.subtractQuantity(element);
    });
    return { saleId: id, itemUpdated: body };
  },
  delete: async (req) => {
    const { params: { id } } = req;
    const result = await salesModel.getById(id);
    if (result.length === 0) throw error(404, 'Sale not found');
    result.forEach((element) => productsModel.sumQuantity(element));
    await salesModel.deleteSaleProduct(id);
    await salesModel.deleteSales(id);
  },
};
