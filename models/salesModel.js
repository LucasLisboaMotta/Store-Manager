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
};
