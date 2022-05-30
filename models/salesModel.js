const conection = require('./concection');

module.exports = {
  getAll: async () => {
    const query = `
    SELECT
    sales.id AS saleId,
    sales.date,
    sales_products.product_id AS productId,
    sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    ORDER BY saleId, productId
    ;`;
    const [result] = await conection.execute(query);
    return result;
  },
  getById: async (id) => {
    const query = `
    SELECT 
    sales.date,
    sales_products.product_id AS productId,
    sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    where sales.id = ?
    ORDER BY productId
    ;`;
    const [result] = await conection.execute(query, [id]);
    return result;
  },
  postNewSale: async () => {
    console.log('Entrei no sale');
    const query = 'INSERT INTO sales (date) VALUES (NOW());';
    const [{ insertId }] = await conection.execute(query);
    return insertId;
  },
  postSaleProduct: async ({ quantity, productId }, id) => {
    console.log('Entrei no sales_products');
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
    await conection.execute(query, [id, productId, quantity]);
  },
  deleteSaleProduct: async (id) => {
    const query = 'DELETE FROM sales_products WHERE sale_id = ?;';
    await conection.execute(query, [id]);
  },
  deleteSales: async (id) => {
    const query = 'DELETE FROM sales WHERE id = ?;';
    await conection.execute(query, [id]);
  },
};
