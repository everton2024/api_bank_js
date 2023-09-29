const isDigit = require('../isDigit');

const dateOfBirdIsValid = (date) => {
  if (!date) {
    return { valid: false, message: 'Data de nascimento não digitada' };
  }
  const dateIsDefault = date.split('-');
  const dateValueIsDigit = dateIsDefault.every((i) => isDigit(i));
  const [year, month, day] = dateIsDefault.map((i) => i.length);

  if (dateIsDefault.length !== 3 || year !== 4 || month !== 2 || day !== 2) {
    return {
      valid: false,
      message: 'Digite a data de nascimento no seguinte padrão YYYY-MM-DD',
    };
  }

  if (!dateValueIsDigit) {
    return {
      valid: false,
      message: 'Os valores devem ser numericos',
    };
  }
  const dateOfBird = new Date(date);
  const dateCurrent = new Date();
  if (+dateOfBird > +dateCurrent) {
    return {
      valid: false,
      message: 'Não é possivel registrar uma data futura',
    };
  }
  return { valid: true };
};

module.exports = dateOfBirdIsValid;
