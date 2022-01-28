const connection = require('./connection');

async function createSalesProducts({ quantity, productId, id }) {
  const result = connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
  return result;
}

// funcão ajustada com ajuda do Gabriel Ferreira
async function createSale(products) {
  const [{ insertId: id }] = await connection.query(
    `INSERT INTO sales (id, date)
     VALUES (DEFAULT, DEFAULT)`,
  );
  const arrPromises = products.map(
    ({ quantity, product_id: productId }) => createSalesProducts({ quantity, productId, id }),
  );
  await Promise.all(arrPromises);
  return id;
}

async function getAllSales() {
  const [sales] = await connection.execute(
    `SELECT sale_id as saleId, product_id, quantity, date
    FROM sales_products a
    JOIN sales as b
    ON a.sale_id = b.id`,
  );
  return sales;
}

async function getSaleById(id) {
  const [sale] = await connection.query(
    `
    SELECT s.date, sp.product_id, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?`,
    [id],
  );
  return sale;
}

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
