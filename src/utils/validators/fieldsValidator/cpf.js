const cpfCheck = require('cpf-check');
const data = require('../../../models/bancodedados');

const cpfIsValid = (cpf, numberAccount = '') => {
  if (!cpf) return { valid: false, message: 'Cpf não digitado' };

  const cleanCpf = cpf.replace(/\D/g, '');
  if (!cpfCheck.validate(cleanCpf)) {
    return { valid: false, message: 'Cpf inválido' };
  }

  const dataWithoutSpecificUser = data.contas.filter(
    (i) => i.numero !== numberAccount
  );
  console.log(data);
  console.log(dataWithoutSpecificUser);
  const isUniqueCpf = dataWithoutSpecificUser.some(
    (i) => i.usuario.cpf === cleanCpf
  );
  if (isUniqueCpf)
    return {
      valid: false,
      message: 'Já existe uma conta com o cpf ou e-mail informado!',
    };

  return { valid: true };
};

module.exports = cpfIsValid;
