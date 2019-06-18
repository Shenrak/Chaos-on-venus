const { checkRessources, getWorkers, getInfrastructures } = require("./getters")
const { handleApiEvent } = require("../utils/event-handlers")

module.exports.checkRessources = handleApiEvent(checkRessources)
module.exports.getWorkers = handleApiEvent(getWorkers)
module.exports.getInfrastructures = handleApiEvent(getInfrastructures)