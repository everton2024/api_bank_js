const errorResponse400 = (res, mensagem) => {
  return res.status(400).send({ mensagem });
};

module.exports = { errorResponse400 };
