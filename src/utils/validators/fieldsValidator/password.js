const isDigit = require('../../isDigit');

const passwordIsValid = (password) => {
  if (!password) return { valid: false, message: 'Digite a senha' };

  if (password.length < 6)
    return { valid: false, message: 'A senha deve ter no minimo 6 digitos' };

  if (!isDigit(password))
    return { valid: false, message: 'A senha deve ser numerica' };

  let tempDigit = '';
  for (const digit of password) {
    if (tempDigit === digit) {
      return {
        valid: false,
        message: 'A senha não deve ter uma sequência de mesmo digito',
      };
    } else {
      tempDigit = digit;
    }
  }
  return { valid: true };
};

module.exports = passwordIsValid;
