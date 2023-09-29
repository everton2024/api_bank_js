const isAuthorized = (req, res, next) => {
  const { senha_banco } = req.query;
  const bankPassword = 'Cubos123Bank';

  if (!senha_banco || senha_banco !== bankPassword)
    return res.status(401).send({ message: 'Senha inválida' });

  next();
};

module.exports = isAuthorized;
