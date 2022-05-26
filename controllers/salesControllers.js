const salesServices = require('../services/salesServices');

module.exports = {
  getAll: async (_req, res) => {
    const result = await salesServices.getAll();
    return res.status(200).json(result);    
  },
  getById: async (req, res, next) => {
    try {
      const result = await salesServices.getById(req);
      return res.status(200).json(result); 
    } catch (err) {
      next(err);
    }
  },
};