const salesService = require('../services/salesService');

// /sales post
async function createSale(request, response) {
  const product = request.body;
  const validation = await salesService.create(product);
  if (typeof validation.message === 'string') {
    return response.status(validation.status).json({ message: validation.message });
  }
  return response.status(201).json(validation);
}

// sales get
async function getAll2(_request, response) {
  const getall = await salesService.getAll();
  return response.status(200).json(getall);
}

// /sales/:id get
async function getById2(request, response) {
  const { id } = request.params;
  const sale = await salesService.getById(id);
  if (typeof sale.message === 'string') {
    return response.status(sale.status).json({ message: sale.message });
  }
  return response.status(200).json(sale);
}

// /sales/:id put
async function updateSale(request, response) {
  const { id } = request.params;
  const [product] = request.body;
  const $update = await salesService.update(product, id);
  if (typeof $update.message === 'string') {
    return response.status($update.status).json({ message: $update.message });
  }
  return response.status(200).json($update);
}

module.exports = {
  createSale,
  getAll2,
  getById2,
  updateSale,
};
