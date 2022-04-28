const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./src/controllers/productController');
const salesController = require('./src/controllers/salesController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll3);
app.post('/products', productController.createProduct);
app.get('/products/:id', productController.getById3);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);
app.get('/sales', salesController.getAll2);
app.post('/sales', salesController.createSale);
app.get('/sales/:id', salesController.getById2);
app.put('/sales/:id', salesController.updateSale);

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
