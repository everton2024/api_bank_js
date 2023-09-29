const data = require('../models/data');
const write = require('../models/writeDB');
const dateTime = require('../utils/formats/dateTime');
const valueCents = require('../utils/formats/valueCents');
const { errorResponse400 } = require('../utils/responses/errorResponse');

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

    const registreDeposit = {
      data: dateTime(),
      numero_conta: String(numero_conta),
      valor: valueCents(valor),
    };

    data.depositos.push(registreDeposit);
    await write(data);
  }
}

module.exports = new Transations();
