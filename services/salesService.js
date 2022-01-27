const salesModel = require('../models/salesModel');

async function validateProductID(product) {
  const productId = await product.find((pro) => !pro.product_id);

  if (productId) {
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

async function create(product) {
  if (!product) return false;
  const productId = await validateProductID(product);

  if (productId) {
    return productId;
  }
  const quantity = await validateQuantity(product);
  if (quantity) {
    return quantity;
  }
  const quantity2 = await validateQuantity2(product);
  if (quantity2) {
    return quantity2;
  }
  const { id } = await salesModel.createSale(product);

  return { id, itemsSold: product };
}

module.exports = {
  create,
};
