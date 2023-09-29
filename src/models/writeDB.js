const fs = require('fs/promises');

async function write(data) {
  const dataStringfy = JSON.stringify(data);
  await fs.writeFile(
    'src/models/bancodedados.js',
    `module.exports = ${dataStringfy}`
  );
}

module.exports = write;
