const { Router } = require('express');
const account = require('../controllers/accounts');
const isAuthorized = require('../middlewares/bankPassword');

const routes = Router();

routes.get('/contas', isAuthorized, account.index);
routes.get('/contas/saldo', account.readWithdraw);
routes.get('/contas/extrato', account.extractAccount);

routes.post('/contas', account.store);

routes.put('/contas/:numeroConta/usuario', account.update);

routes.delete('/contas/:numeroConta', account.delete);

module.exports = routes;
