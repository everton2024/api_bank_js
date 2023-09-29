const { Router } = require('express');
const transations = require('../controllers/transations');

const routes = Router();

routes.post('/transacoes/depositar', transations.deposit);
routes.post('/transacoes/sacar', transations.withdraw);

module.exports = routes;
