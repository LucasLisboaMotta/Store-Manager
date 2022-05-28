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
  post: async (req, res) => {
    const result = await salesServices.post(req);
    return res.status(201).json(result);    
  },
  put: async (req, res, next) => {
    try {
      const result = await salesServices.put(req);
      return res.status(200).json(result); 
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      await salesServices.delete(req);
      return res.status(204).json(); 
    } catch (err) {
      next(err);
    }
  },
};