const { Router } = require('express');
const transations = require('../controllers/transations');

const routes = Router();

routes.post('/transacoes/depositar', transations.deposit);
routes.post('/transacoes/sacar', transations.withdraw);
routes.post('/transacoes/transferir', transations.transfer);

module.exports = routes;
