const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

function validateProductID(product) {
  if (product.some(({ product_id: id }) => !id)) {
    return { status: 400, message: '"product_id" is required' };
  }
  return false;
}

async function validateQuantity(product) {
  const quantity = await product.find((pro) => !pro.quantity && pro.quantity !== 0);

  if (quantity) {
    return { status: 400, message: '"quantity" is required' };
  }
  return false;
}

async function validateQuantity2(product) {
  const quantity = await product.find((pr) => pr.quantity < 1 || typeof pr.quantity !== 'number');

  if (quantity) {
    return { status: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
  return false;
}

// funcão ajustada com ajuda do Gabriel Ferreira
async function create(product) {
  const productId = await validateProductID(product);
  const arrId = await Promise.all(
    product.map(({ product_id: productID }) => productModel.getById(productID)),
  );
  if (arrId.some((id) => id.length === 0 || !id)) {
    return {
      status: 400,
      message: '"product_id" is required',
    };
  }
  if (productId) return productId;
  const quantity = await validateQuantity(product);
  if (quantity) return quantity;
  const quantity2 = await validateQuantity2(product);
  if (quantity2) return quantity2;
  const id = await salesModel.createSale(product);
  return { id, itemsSold: product };
}

async function getAll() {
  const sales = await salesModel.getAllSales();
  return sales;
}

async function getById(id) {
  const sale = await salesModel.getSaleById(id);
  if (sale.length === 0) {
    return { status: 404, message: 'Sale not found' };
  }
  return sale;
}

async function validadeUpdate(quantity) {
  if (!quantity && quantity !== 0) {
    return { status: 400, message: '"quantity" is required' };
  }
  if (quantity < 1 || typeof quantity !== 'number') {
    return { status: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
  return false;
}

async function update(product, id) {
  const { product_id: productId, quantity } = product;
  const $validadeUpdate = await validadeUpdate(quantity);
  if ($validadeUpdate) return $validadeUpdate;
  if (!productId) {
    return { status: 400, message: '"product_id" is required' };
  }
  await salesModel.updateSale(productId, quantity, id);
  return {
    saleId: id,
    itemUpdated: [product],
  };
}

module.exports = {
  create,
  getById,
  getAll,
  update,
};
