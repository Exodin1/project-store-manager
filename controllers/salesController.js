const express = require('express');

const router = express.Router();
const salesService = require('../services/salesService');

router.post('/sales', async (request, response) => {
  const product = request.body;
  console.log(product);
  const validation = await salesService.create(product);
  if (typeof validation.message === 'string') {
    return response.status(validation.status).json({ message: validation.message });
  }
  return response.status(201).json(validation);
});

module.exports = router;
