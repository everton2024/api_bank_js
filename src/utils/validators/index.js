const nameIsValid = require('./fieldsValidator/name');
const cpfIsValid = require('./fieldsValidator/cpf');
const dateOfBirdIsValid = require('./fieldsValidator/dateOfBird');
const emailIsValid = require('./fieldsValidator/email');
const phoneIsValid = require('./fieldsValidator/phone');
const passwordIsValid = require('./fieldsValidator/password');

const isValidUserAccount = (
  nome,
  cpf,
  data_nascimento,
  telefone,
  email,
  senha,
  numberAccount = ''
) => {
  const { valid: validName, message: messageName } = nameIsValid(nome);
  if (!validName) return { validName, message: messageName };

  const { valid: validcpf, message: messagecpf } = cpfIsValid(
    cpf,
    numberAccount
  );
  if (!validcpf) return { validcpf, message: messagecpf };

  const { valid: validDateBird, message: messageDateBird } =
    dateOfBirdIsValid(data_nascimento);
  if (!validDateBird) return { validDateBird, message: messageDateBird };

  const { valid: validPhone, message: messagePhone } = phoneIsValid(telefone);
  if (!validPhone) return { validPhone, message: messagePhone };

  const { valid: validEmail, message: messageEmail } = emailIsValid(
    email,
    numberAccount
  );
  if (!validEmail) return { validEmail, message: messageEmail };

  const { valid: validPassword, message: messagePassword } =
    passwordIsValid(senha);
  if (!validPassword) return { validPassword, message: messagePassword };

  return { valid: true };
};

module.exports = isValidUserAccount;
