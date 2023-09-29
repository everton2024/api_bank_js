const { parsePhoneNumberFromString } = require('libphonenumber-js');

const phoneIsValid = (phone) => {
  if (!phone) return { valid: false, message: 'Telefone não digitado' };

  const cleanPhone = phone.replace(/\D/g, '');
  const parsedPhoneNumber = parsePhoneNumberFromString(cleanPhone, 'BR');
  const valid = parsedPhoneNumber && parsedPhoneNumber.isValid();
  if (!valid) return { valid: false, message: 'Telefone inválido' };

  return { valid: true, cleanData: cleanPhone };
};

module.exports = phoneIsValid;
