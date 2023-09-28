const { Router } = require('express');
const index = require('../controllers');

const routes = Router();

routes.get('/', index);

module.exports = routes;
