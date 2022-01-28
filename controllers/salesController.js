const express = require('express');

const router = express.Router();
const salesService = require('../services/salesService');

router.post('/sales', async (request, response) => {
  const product = request.body;
  const validation = await salesService.create(product);
  if (typeof validation.message === 'string') {
    return response.status(validation.status).json({ message: validation.message });
  }
  return response.status(201).json(validation);
});

router.get('/sales', async (_request, response) => {
  const getall = await salesService.getAll();
  return response.status(200).json(getall);
});

router.get('/sales/:id', async (request, response) => {
  const { id } = request.params;
  const sale = await salesService.getById(id);
  if (typeof sale.message === 'string') {
    return response.status(sale.status).json({ message: sale.message });
  }
  return response.status(200).json(sale);
});

module.exports = router;
