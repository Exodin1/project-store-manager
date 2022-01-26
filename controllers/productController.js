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

module.exports = router;
