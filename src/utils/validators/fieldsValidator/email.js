const validator = require('validator');
const data = require('../../../models/bancodedados');

const emailIsValid = (email) => {
  if (!email) return { valid: false, message: 'Email não digitado' };

  if (!validator.isEmail(email)) {
    return { valid: false, message: 'Email inválido' };
  }

  const isUniqueEmail = data.contas.some((i) => i.usuario.email === email);
  console.log(isUniqueEmail);
  if (isUniqueEmail) return { valid: false, message: 'Email já existente' };

  return { valid: true };
};

module.exports = emailIsValid;
