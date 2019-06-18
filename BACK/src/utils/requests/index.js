const { $getRessources } = require("./ressources")
const { $getWorkers } = require("./workers")
const { $getInfrastructures } = require("./infrastructures")

module.exports.$getRessources = $getRessources

module.exports.$getWorkers = $getWorkers

module.exports.$getInfrastructures = $getInfrastructures