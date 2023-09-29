const { Router } = require('express');
const account = require('../controllers');
const isAuthorized = require('../middlewares/bankPassword');

const routes = Router();

routes.get('/contas', isAuthorized, account.index);
routes.post('/contas', account.store);
routes.put('/contas/:numeroConta/usuario', account.update);

module.exports = routes;
