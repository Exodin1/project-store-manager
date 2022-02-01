const productService = require('../services/productService');

// /products post
async function createProduct(request, response) {
  const { name, quantity } = request.body;
  const validation = await productService.finalValidation(name, quantity);
  if (typeof validation.message === 'string') {
    return response.status(validation.status).json({ message: validation.message });
  }
  return response.status(validation.status).json(validation.message);
}

// /products/:id get
async function getById3(request, response) {
  const { id } = request.params;
  const product = await productService.getById(id);
  if (!product) {
    return response.status(404).json({ message: 'Product not found' });
  }
  return response.status(200).json(product[0]);
}
// /products get
async function getAll3(_request, response) {
  const allProducts = await productService.getAll();
  return response.status(200).json(allProducts);
}
// /products/:id put
async function updateProduct(request, response) {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const productUpdated = await productService.update(id, name, quantity);
  if (typeof productUpdated.message === 'string') {
    return response.status(productUpdated.status).json({ message: productUpdated.message });
  }
  return response.status(200).send(productUpdated);
}
// /products/:id delete
async function deleteProduct(request, response) {
  const { id } = request.params;
  const product = await productService.$delete(id);
  if (product) {
    return response.status(200).json(product[0]);
  }
  return response.status(404).json({ message: 'Product not found' });

  // return productService.$delete(id);
}

module.exports = {
  createProduct,
  getAll3,
  getById3,
  updateProduct,
  deleteProduct,
};
