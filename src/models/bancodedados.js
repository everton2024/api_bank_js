module.exports = {
  banco: {
    nome: 'Cubos Bank',
    numero: '123',
    agencia: '0001',
    senha: 'Cubos123Bank',
  },
  contas: [
    {
      numero: '1',
      saldo: 180200,
      usuario: {
        nome: 'erick costa ',
        cpf: '07128842543',
        data_nascimento: '1995-09-20',
        telefone: '71993141181',
        email: 'teste@teste2.com',
        senha: '123456',
      },
    },
    {
      numero: '2',
      saldo: 200000,
      usuario: {
        nome: 'erick costa ',
        cpf: '71113748001',
        data_nascimento: '1995-09-20',
        telefone: '71993141181',
        email: 'teste@teste1.com',
        senha: '123456',
      },
    },
  ],
  saques: [
    { data: '2023-09-29 18:25:09', numero_conta: '1', valor: 10000 },
    { data: '2023-09-29 18:25:33', numero_conta: '1', valor: 10000 },
  ],
  depositos: [
    { data: '2023-09-29 18:24:25', numero_conta: '1', valor: 100050 },
    { data: '2023-09-29 18:24:26', numero_conta: '1', valor: 100050 },
    { data: '2023-09-29 18:25:02', numero_conta: '2', valor: 100050 },
    { data: '2023-09-29 18:25:14', numero_conta: '2', valor: 100050 },
  ],
  transferencias: [
    {
      data: '2023-09-29 18:26:49',
      numero_conta_origem: '2',
      numero_conta_destino: '1',
      valor: 100,
    },
  ],
};
