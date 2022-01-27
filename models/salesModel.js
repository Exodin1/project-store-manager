const connection = require('./connection');

async function createSalesProducts(saleid, productid, quantity) {
  if (!saleid || !productid || !quantity) return false;
  const [result] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?',
    [saleid, productid, quantity],
  );
  return result;
}

async function createSale(products) {
  if (!products) return false;
  const [{ insertId: id }] = await connection.query(
    `INSERT INTO sales (id, date)
     VALUES (DEFAULT, DEFAULT);`,
  );

  await createSalesProducts(products.map(
    ({ product_id: productID, quantity }) => [id, productID, quantity],
  ));

  return { id };
}

module.exports = {
  createSale,
};
