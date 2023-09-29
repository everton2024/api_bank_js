const { Router } = require('express');
const account = require('../controllers');
const isAuthorized = require('../middlewares/bankPassword');

const routes = Router();

routes.get('/contas', isAuthorized, account.index);
routes.post('/contas', account.store);

module.exports = routes;
