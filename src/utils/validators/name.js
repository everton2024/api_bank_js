const nameIsValid = (name) => {
  if (!name) return { valid: false, message: 'Digite o nome e sobrenome' };

  const nameAndLastName = name.trim().split(' ');
  if (nameAndLastName.length < 2)
    return { valid: false, message: 'Digite o nome e sobrenome' };
  if (nameAndLastName.some((i) => i.length < 3)) {
    return { valid: false, message: 'Não use abreviações em nome e sobrenome' };
  }

  return { valid: true };
};

module.exports = nameIsValid;
