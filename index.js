require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
