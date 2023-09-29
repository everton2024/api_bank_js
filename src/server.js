const express = require('express');
const routesAccounts = require('./routes/accounts');
const routesTransations = require('./routes/transactions');

const app = express();

app.use(express.json());
app.use(routesAccounts);
app.use(routesTransations);

app.listen(3000);
