const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.use('/', productController);
app.use('/', salesController);

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
