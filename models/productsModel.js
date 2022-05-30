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
    console.log('Entrei na criação do post');
    const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
    const [{ insertId }] = await conection.execute(query, [name, quantity]);
    return insertId;
  },
  put: async (name, quantity, id) => {
    const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
    const [{ affectedRows }] = await conection.execute(query, [name, quantity, id]);
    return affectedRows;
  },
  sumQuantity: async ({ quantity, productId }) => {
    const query = 'UPDATE products SET quantity = quantity + ? WHERE id = ?;';
    const [{ affectedRows }] = await conection.execute(query, [quantity, productId]);
    return affectedRows;
  },
  subtractQuantity: async ({ quantity, productId }) => {
    const query = 'UPDATE products SET quantity = quantity - ? WHERE id = ?;';
    const [{ affectedRows }] = await conection.execute(query, [quantity, productId]);
    return affectedRows;
  },
  delete: async (id) => {
    const query = 'DELETE FROM products WHERE id = ?;';
    const [{ affectedRows }] = await conection.execute(query, [id]);
    return affectedRows;
  },
};