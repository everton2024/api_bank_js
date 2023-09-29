const data = require('../models/data');
const { successResponse200 } = require('../utils/responses/successResponse');
const { errorResponse400 } = require('../utils/responses/errorResponse');
const isValidUserAccount = require('../utils/validators');
const write = require('../models/writeDB');

class Account {
  index(req, res) {
    return successResponse200(res, data.contas);
  }

  async store(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const { valid, message } = isValidUserAccount(
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha
    );
    if (!valid) return errorResponse400(res, message);

    let newAccountNumber = '';
    if (data.contas.length !== 0) {
      newAccountNumber = Number(data.contas[data.contas.length - 1].numero) + 1;
    } else {
      newAccountNumber = '1';
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanPhone = telefone.replace(/\D/g, '');
    const newAccount = {
      numero: String(newAccountNumber),
      saldo: 0,
      usuario: {
        nome,
        cpf: cleanCpf,
        data_nascimento,
        telefone: cleanPhone,
        email,
        senha,
      },
    };
    data.contas.push(newAccount);
    await write(data);

    return successResponse200(res);
  }

  async update(req, res) {
    const { numeroConta } = req.params;
    let accountUser = data.contas.find((i) => i.numero === numeroConta);
    if (!accountUser) return errorResponse400(res, 'Conta inexistente');

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const { valid, message } = isValidUserAccount(
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha
    );
    if (!valid) return errorResponse400(res, message);

    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanPhone = telefone.replace(/\D/g, '');
    accountUser.usuario = {
      nome,
      cpf: cleanCpf,
      data_nascimento,
      telefone: cleanPhone,
      email,
      senha,
    };

    await write(data);

    return successResponse200(res);
  }

  async delete(req, res) {
    const { numeroConta } = req.params;
    const accountUser = data.contas.find((i) => i.numero === numeroConta);
    if (!accountUser) return errorResponse400(res, 'Conta inexistente');

    if (accountUser.saldo !== 0)
      return errorResponse400(
        res,
        'A conta só pode ser removida se o saldo for zero!'
      );

    const index = data.contas.indexOf(accountUser);
    data.contas.splice(index, 1);
    await write(data);

    return successResponse200(res);
  }
}

module.exports = new Account();