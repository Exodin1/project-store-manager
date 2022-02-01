const connection = require('./connection');

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return { id: result.insertId };
};

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM products');
  return rows;
};

async function getByName(name) {
  if (!name) return false;
  const [result] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return result;
}

async function getById(id) {
  if (!id) return false;
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
}

const update = async (id, name, quantity) => {
  if (!id || !name || !quantity) return false;
  const [result] = await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  if (result.affectedRows === 0) return false;
  return true;
};

const $delete = async (id) => {
  const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  update,
  $delete,
};
