const { Router } = require('express');
const transations = require('../controllers/transations');

const routes = Router();

routes.get('/transacoes/depositar', transations.deposit);

module.exports = routes;
