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
      saldo: 190100,
      usuario: {
        nome: 'erick costa',
        cpf: '73762566011',
        data_nascimento: '1995-09-20',
        telefone: '71993141181',
        email: 'teste@teste3.com',
        senha: '123456',
      },
    },
    {
      numero: '2',
      saldo: 0,
      usuario: {
        nome: 'erick costa',
        cpf: '07128842543',
        data_nascimento: '1995-09-20',
        telefone: '71993141181',
        email: 'teste@teste.com',
        senha: '123456',
      },
    },
  ],
  saques: [{ data: '2023-09-29 16:14:41', numero_conta: '1', valor: 10000 }],
  depositos: [
    { data: '2023-09-29 15:57:58', numero_conta: '1', valor: 100050 },
    { data: '2023-09-29 16:13:49', numero_conta: '1', valor: 100050 },
  ],
  transferencias: [
    {
      data: '2021-08-10 23:40:35',
      numero_conta_origem: '1',
      numero_conta_destino: '2',
      valor: 10000,
    },
  ],
};
