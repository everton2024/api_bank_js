function isDigit(str) {
  for (const char of str) {
    if (isNaN(parseInt(char))) return false;
  }
  return true;
}

module.exports = isDigit;
