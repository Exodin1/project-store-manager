const connection = require('./connection');

async function createSalesProducts(product) {
  const [result] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?',
    [product],
  );
  return result;
}

async function createSale(products) {
  const [result] = await connection.execute(
    'INSERT INTO sales (id) VALUES (DEFAULT)',
  );
  const saleId = result.insertId;
  const salesProducts = products.map((product) => [saleId, product.id, product.quantity]);
  await createSalesProducts(salesProducts);
  return saleId;
}

module.exports = {
  createSale,
};
