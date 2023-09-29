const data = require('../models/data');
const write = require('../models/writeDB');
const dateTime = require('../utils/formats/dateTime');
const valueCents = require('../utils/formats/valueCents');
const { errorResponse400 } = require('../utils/responses/errorResponse');
const { successResponse200 } = require('../utils/responses/successResponse');

class Transations {
  async deposit(req, res) {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor)
      return errorResponse400(
        res,
        'O número da conta e o valor são obrigatórios!'
      );

    const account = data.contas.find((i) => i.numero === numero_conta);
    if (!account) return errorResponse400(res, 'Conta inexistente');

    const valueFormat = valueCents(valor);
    const registreDeposit = {
      data: dateTime(),
      numero_conta: String(numero_conta),
      valor: valueFormat,
    };

    data.depositos.push(registreDeposit);
    account.saldo = account.saldo + valueFormat;
    await write(data);

    return successResponse200(res);
  }

  async withdraw(req, res) {
    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha)
      return errorResponse400(
        res,
        'O número da conta, valor e senha são obrigatórios!'
      );

    const account = data.contas.find((i) => i.numero === numero_conta);
    if (!account) return errorResponse400(res, 'Conta inexistente');

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
    await write(data);
  }
}

module.exports = new Transations();
