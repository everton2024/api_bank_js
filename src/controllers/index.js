const fs = require('fs/promises');
const data = require('../models/data');
const { successResponse200 } = require('../utils/responses/successResponse');
const { errorResponse400 } = require('../utils/responses/errorResponse');
const isValidUserAccount = require('../utils/validators');

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

    const newAccountNumber =
      Number(data.contas[data.contas.length - 1].numero) + 1;
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
    const dataStringfy = JSON.stringify(data);

    await fs.writeFile(
      'src/models/data.js',
      `module.exports = ${dataStringfy}`
    );

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

    const dataStringfy = JSON.stringify(data);

    await fs.writeFile(
      'src/models/data.js',
      `module.exports = ${dataStringfy}`
    );

    return successResponse200(res);
  }
}

module.exports = new Account();
