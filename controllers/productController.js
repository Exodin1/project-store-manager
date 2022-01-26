const express = require('express');

const router = express.Router();
const productService = require('../services/productService');

router.post('/products', async (request, response) => {
  const { name, quantity } = request.body;
  const validation = await productService.finalValidation(name, quantity);
  if (typeof validation.message === 'string') {
    return response.status(validation.status).json({ message: validation.message });
  }
  return response.status(validation.status).json(validation.message);
});

router.get('/products/:id', async (request, response) => {
  const { id } = request.params;
  const product = await productService.getById(id);
  if (!product) {
    return response.status(404).json({ message: 'Product not found' });
  }
  return response.status(200).json(product[0]);
});

router.get('/products', async (_request, response) => {
  const allProducts = await productService.getAll();
  return response.status(200).json(allProducts);
});

module.exports = router;