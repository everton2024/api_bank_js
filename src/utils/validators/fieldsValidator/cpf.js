const cpfCheck = require('cpf-check');
const data = require('../../../models/data');

const cpfIsValid = (cpf) => {
  if (!cpf) return { valid: false, message: 'Cpf não digitado' };

  const cleanCpf = cpf.replace(/\D/g, '');
  if (!cpfCheck.validate(cleanCpf)) {
    return { valid: false, message: 'Cpf inválido' };
  }

  const isUniqueCpf = data.contas.some((i) => i.usuario.cpf === cleanCpf);
  if (isUniqueCpf) return { valid: false, message: 'Cpf já existente' };

  return { valid: true, cleanData: cleanCpf };
};

module.exports = cpfIsValid;
