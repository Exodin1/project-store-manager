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
  try {
    const [result] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
    return result;
  } catch (err) {
    return err;
  }
}

async function getById(id) {
  if (!id) return false;
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
}

module.exports = {
  create,
  getAll,
  getByName,
  getById,
};
