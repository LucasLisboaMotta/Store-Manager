const productsServices = require('../services/productsServices');

module.exports = {
  getAll: async (_req, res) => {
    const result = await productsServices.getAll();
    return res.status(200).json(result);    
  },
  getById: async (req, res, next) => {
    try {
      const result = await productsServices.getById(req);
      return res.status(200).json(result); 
    } catch (err) {
      next(err);
    }
  },
  post: async (req, res, next) => {
    try {
      const result = await productsServices.post(req);
      return res.status(201).json(result); 
    } catch (err) {
      next(err);
    }
  },
};