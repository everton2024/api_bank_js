const data = require('./bancodedados');

function accountUser(numberAccount) {
  const account = data.contas.find((i) => i.numero === numberAccount);
  return { account, message: 'Conta bancária não encontada!' };
}

module.exports = accountUser;
