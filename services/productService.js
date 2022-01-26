const productModel = require('../models/productModel');

const validatename = async (name) => {
  if (!name) {
    return { status: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return { status: 422, message: '"name" length must be at least 5 characters long' };
  }
  if (typeof name !== 'string') {
    return { status: 422, message: '"name" length must be at least 5 characters long' };
  }
  return false;
};

const doubledName = async (name) => {
  const product = await productModel.getByName(name);
  if (product.length > 0) {
    return { status: 409, message: 'Product already exists' };
  }
  return false;
};

const validateQuantity = async (quantity) => {
  if (quantity === undefined) {
    return { status: 400, message: '"quantity" is required' };
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return { status: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }

  return false;
};

const finalValidation = async (name, quantity) => {
  const nameValidation = await validatename(name);
  const quantityValidation = await validateQuantity(quantity);
  const doubledNameValidation = await doubledName(name);
  if (nameValidation) {
    return nameValidation;
  }
  if (doubledNameValidation) {
    return doubledNameValidation;
  }
  if (quantityValidation) {
    return quantityValidation;
  }
  const { id } = await productModel.create(name, quantity);
  return { status: 201, message: { id, name, quantity } };
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (product.length === 0) {
    return false;
  }
  return product;
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

module.exports = {
  finalValidation,
  getById,
  getAll,
};
