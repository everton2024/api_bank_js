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
      saldo: 0,
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
  saques: [],
  depositos: [
    { data: '2023-09-29 15:43:28', numero_conta: '1', valor: '100050' },
  ],
  transferencias: [],
};
