const os = require('os')
const cpuStat = require('cpu-stat')

module.exports.getState = function () {
  const mem = os.freemem() / os.totalmem() * 100;
  console.log(`内存占用率${mem}%`);
  cpuStat.usagePercent((err, precent) => {
    console.log(`CPU占用${precent}%`);
  });
}