const data = require('../models/bancodedados');
const {
  successResponse200,
  successResponse204,
  successResponse201,
} = require('../utils/responses/successResponse');
const {
  errorResponse400,
  errorResponse403,
} = require('../utils/responses/errorResponse');
const isValidUserAccount = require('../utils/validators');
const write = require('../models/writeDB');
const accountUser = require('../models/findUser');

class Account {
  index(req, res) {
    if (data.contas.length === 0) {
      return successResponse204(res);
    }
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
    try {
      await write(data);
    } catch (error) {
      return errorResponse403(res);
    }

    return successResponse201(res);
  }

  async update(req, res) {
    const { numeroConta } = req.params;
    const { account, message: messageUserExist } = accountUser(numeroConta);
    if (!account) return errorResponse400(res, messageUserExist);

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const { valid, message } = isValidUserAccount(
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
      numeroConta
    );
    if (!valid) return errorResponse400(res, message);

    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanPhone = telefone.replace(/\D/g, '');
    account.usuario = {
      nome,
      cpf: cleanCpf,
      data_nascimento,
      telefone: cleanPhone,
      email,
      senha,
    };

    try {
      await write(data);
    } catch (error) {
      return errorResponse403(res);
    }

    return successResponse204(res);
  }

  async delete(req, res) {
    const { numeroConta } = req.params;
    const { account, message } = accountUser(numeroConta);
    if (!account) return errorResponse400(res, message);

    if (account.saldo !== 0)
      return errorResponse400(
        res,
        'A conta só pode ser removida se o saldo for zero!'
      );

    const index = data.contas.indexOf(accountUser);
    data.contas.splice(index, 1);
    try {
      await write(data);
    } catch (error) {
      return errorResponse403(res);
    }

    return successResponse204(res);
  }

  readBalance(req, res) {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
      return errorResponse400(res, 'Numero da conta e senha são obrigatorios');
    }
    const { account, message } = accountUser(numero_conta);
    if (!account) return errorResponse400(res, message);

    if (senha !== account.usuario.senha)
      return errorResponse400(res, 'Senha inválida');

    return successResponse200(res, { saldo: account.saldo });
  }

  extractAccount(req, res) {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
      return errorResponse400(res, 'Numero e senha da conta são obrigatorios');
    }

    const { account, message } = accountUser(numero_conta);
    if (!account) {
      return errorResponse400(res, message);
    }
    if (senha !== account.usuario.senha) {
      return errorResponse400(res, 'Senha invalida');
    }

    const extract = {
      depositos: data.depositos.filter((i) => i.numero_conta === numero_conta),
      saque: data.saques.filter((i) => i.numero_conta === numero_conta),
      transferenciasEnviadas: data.transferencias.filter(
        (i) => i.numero_conta_origem === numero_conta
      ),
      transferenciasRecebidas: data.transferencias.filter(
        (i) => i.numero_conta_destino === numero_conta
      ),
    };

    return successResponse200(res, extract);
  }
}

module.exports = new Account();
