const fs = require('fs');
const path = require('path');

module.exports.readJsonFile = (dirname, configFile) => {
  const configPath = path.resolve(dirname, configFile)
  const rawdata = fs.readFileSync(configPath);  
  return JSON.parse(rawdata);  
}