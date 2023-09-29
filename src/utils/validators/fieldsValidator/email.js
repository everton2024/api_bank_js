const validator = require('validator');
const data = require('../../../models/bancodedados');

const emailIsValid = (email, numberAccount = '') => {
  if (!email) return { valid: false, message: 'Email não digitado' };

  if (!validator.isEmail(email)) {
    return { valid: false, message: 'Email inválido' };
  }

  const dataWithoutSpecificUser = data.contas.filter(
    (i) => i.numero !== numberAccount
  );
  const isUniqueEmail = dataWithoutSpecificUser.some(
    (i) => i.usuario.email === email
  );
  if (isUniqueEmail)
    return {
      valid: false,
      message: 'Já existe uma conta com o cpf ou e-mail informado!',
    };

  return { valid: true };
};

module.exports = emailIsValid;
