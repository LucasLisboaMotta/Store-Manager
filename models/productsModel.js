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
  getByName: async (name) => {
    const query = 'SELECT * FROM products WHERE name = ?';
    const [[result]] = await conection.execute(query, [name]);
    return result;
  },
  post: async (name, quantity) => {
    const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
    const [{ insertId }] = await conection.execute(query, [name, quantity]);
    return insertId;
  },
};