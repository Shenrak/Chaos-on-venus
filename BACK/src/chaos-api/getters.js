const { $getRessources, $getWorkers, $getInfrastructures } = require("../utils/requests")

module.exports.checkRessources = async () => {
  const result = $getRessources()
  return result
}

module.exports.getWorkers = async () => {
  const result = $getWorkers()
  return result
}

module.exports.getInfrastructures = async () => {
  const result = $getInfrastructures()
  return result
}

