const fs = require('fs/promises');
const data = require('../models/data');
const { successResponse200 } = require('../utils/responses/successResponse');
const { errorResponse400 } = require('../utils/responses/errorResponse');
const cpfIsValid = require('../utils/validators/cpf');
const dateOfBirdIsValid = require('../utils/validators/dateOfBird');
const emailIsValid = require('../utils/validators/email');
const nameIsValid = require('../utils/validators/name');
const phoneIsValid = require('../utils/validators/phone');
const passwordIsValid = require('../utils/validators/password');

class Account {
  index(req, res) {
    return successResponse200(res, data.contas);
  }

  async store(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const { valid: validName, message: messageName } = nameIsValid(nome);
    if (!validName) return errorResponse400(res, messageName);

    const { valid: validcpf, message: messagecpf } = cpfIsValid(cpf);
    if (!validcpf) return errorResponse400(res, messagecpf);

    const { valid: validDateBird, message: messageDateBird } =
      dateOfBirdIsValid(data_nascimento);
    if (!validDateBird) return errorResponse400(res, messageDateBird);

    const { valid: validPhone, message: messagePhone } = phoneIsValid(telefone);
    if (!validPhone) return errorResponse400(res, messagePhone);

    const { valid: validEmail, message: messageEmail } = emailIsValid(email);
    if (!validEmail) return errorResponse400(res, messageEmail);

    const { valid: validPassword, message: messagePassword } =
      passwordIsValid(senha);
    if (!validPassword) return errorResponse400(res, messagePassword);

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
}

module.exports = new Account();

// {
//   numero: '1',
//   saldo: 0,
//   usuario: {
//     nome: 'Foo Bar',
//     cpf: '00011122233',
//     data_nascimento: '2021-03-15',
//     telefone: '71999998888',
//     email: 'foo@bar.com',
//     senha: '1234',
//   },
// },

// {
// 	"email": "teste@teste.com",
// 	"cpf": "07128842543",
// 	"telefone": "71 99314-1181",
// 	"data_nascimento": "1995-09-20",
// 	"senha": "123456"
// }
