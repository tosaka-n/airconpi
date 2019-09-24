const util = require("util")
const exec = util.promisify(require('child_process').exec);

module.exports = async function(key) {
  console.log(`${Date().toLocaleString()} irsend ${key}`);
  const { stdout, stderr } = await exec(`irsend SEND_ONCE aircon ${key}`);
  if (stderr) {
    return `error: ${stderr}`;
  }
  return `ok, ac ${stdout}`;
}

