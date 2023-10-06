const { errorResponse401 } = require('../utils/responses/errorResponse');
const data = require('../models/bancodedados');

const isAuthorized = (req, res, next) => {
  const { senha_banco } = req.query;
  const bankPassword = data.banco.senha;

  if (!senha_banco || senha_banco !== bankPassword)
    return errorResponse401(res, 'A senha do banco informada é inválida!');

  next();
};

module.exports = isAuthorized;
