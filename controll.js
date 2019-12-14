const util = require("util")
const exec = util.promisify(require('child_process').exec);

module.exports.irsend = async function(key) {
  console.log(`${Date().toLocaleString()} irsend ${key}`);
  const { stdout, stderr } = await exec(`irsend SEND_ONCE aircon ${key}`);
  if (stderr) {
    return `error: ${stderr}`;
  }
  return `ok, ac ${stdout}`;
}

module.exports.irsendRemind = async function(key, set) {
   const ms = {
     h : 60 * 60 * 1000,
     m : 60 * 1000,
     s : 1000
   }
   const setms = ms[set.match(/[a-z]/)[0]];
   const setnum = set.match(/\d{0,}/)[0];
   if (isNaN(setms)) {
     return "wrong setting h/m/s";
   }
   console.log(`${Date().toLocaleString()} irsend ${key}`);
   const { stdout, stderr } = setTimeout(exec(`irsend SEND_ONCE aircon ${key}`), setms * setnum);
   if (stderr) {
     return `error: ${stderr}`;
   }
   return `ok, ac ${stdout}, after ${setnum} * ${setms}`;
}
