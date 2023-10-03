const data = require('../models/bancodedados');
const write = require('../models/writeDB');
const dateTime = require('../utils/formats/dateTime');
const valueCents = require('../utils/formats/valueCents');
const {
  errorResponse400,
  errorResponse403,
} = require('../utils/responses/errorResponse');
const { successResponse204 } = require('../utils/responses/successResponse');
const accountUser = require('../models/findUser');

class Transations {
  async deposit(req, res) {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor)
      return errorResponse400(
        res,
        'O número da conta e o valor são obrigatórios!'
      );

    const { account, message } = accountUser(numero_conta);
    if (!account) return errorResponse400(res, message);

    const valueFormat = valueCents(valor);
    const registreDeposit = {
      data: dateTime(),
      numero_conta: String(numero_conta),
      valor: valueFormat,
    };

    data.depositos.push(registreDeposit);
    account.saldo = account.saldo + valueFormat;
    try {
      await write(data);
    } catch (error) {
      return errorResponse403(res);
    }

    return successResponse204(res);
  }

  async withdraw(req, res) {
    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha)
      return errorResponse400(
        res,
        'O número da conta, valor e senha são obrigatórios!'
      );

    const { account, message } = accountUser(numero_conta);
    if (!account) return errorResponse400(res, message);

    if (senha !== account.usuario.senha)
      return errorResponse400(res, 'Senha inválida');

    const valueFormat = valueCents(valor);
    if (valueFormat <= 0)
      return errorResponse400(res, 'O valor não pode ser menor que zero!');

    if (valueFormat > account.saldo)
      return errorResponse400(res, 'Valor solicitado é maior que o saldo ');

    const registreWithdraw = {
      data: dateTime(),
      numero_conta: String(numero_conta),
      valor: valueFormat,
    };
    data.saques.push(registreWithdraw);
    account.saldo = account.saldo - valueFormat;
    try {
      await write(data);
    } catch (error) {
      return errorResponse403(res);
    }

    return successResponse204(res);
  }

  async transfer(req, res) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } =
      req.body;
    if (!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
      return errorResponse400(
        res,
        'Contas de origem e destino, senha e valor são obrigatorios'
      );
    }
    if (numero_conta_origem === numero_conta_destino) {
      return errorResponse400(
        res,
        'Não é possivel fazer tranferencia para a mesma conta'
      );
    }

    const { account: accountOrigin } = accountUser(numero_conta_origem);
    if (!accountOrigin)
      return errorResponse400(res, 'Conta de origem não encontrada');
    if (senha !== accountOrigin.usuario.senha)
      return errorResponse400(res, 'Senha inválida');

    const { account: accountDestiny } = accountUser(numero_conta_destino);
    if (!accountDestiny)
      return errorResponse400(res, 'Conta de destino não encontrada');

    const valueFormat = valueCents(valor);
    if (valueFormat > accountOrigin.saldo) {
      return errorResponse400(res, 'Saldo insuficiente!');
    }

    const registredTransfer = {
      data: dateTime(),
      numero_conta_origem: accountOrigin.numero,
      numero_conta_destino: accountDestiny.numero,
      valor: valueFormat,
    };

    data.transferencias.push(registredTransfer);
    accountOrigin.saldo = accountOrigin.saldo - valueFormat;
    accountDestiny.saldo = accountDestiny.saldo + valueFormat;

    try {
      await write(data);
    } catch (error) {
      return errorResponse403(res);
    }

    return successResponse204(res);
  }
}

module.exports = new Transations();
