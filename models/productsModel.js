const conection = require('./concection');

module.exports = {
  getAll: async () => {
    const query = 'SELECT * FROM products';
    const [result] = await conection.execute(query);
    return result;
  },
  getById: async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [[result]] = await conection.execute(query, [id]);
    return result;
  },
};