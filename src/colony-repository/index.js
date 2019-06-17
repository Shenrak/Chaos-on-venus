const { handleApiEvent, handleLambdaEvent } = require("../utils/event-handlers")

const { state } = require("./state")
const { consume, refill, getRessources } = require("./interfaces/ressources")
const { getWorkers } = require("./interfaces/workers")
const {
  getInfrastructures,
  updateInfrastructures,
  addWorkForceToInfrastructureAndGetOutPuts
} = require("./interfaces/infrastructures")

const { initDB } = require("./driverDynamdoDB/initDB")

module.exports.consume = handleLambdaEvent(consume)
module.exports.refill = handleLambdaEvent(refill)
module.exports.getRessources = handleLambdaEvent(getRessources)

module.exports.getWorkers = handleLambdaEvent(getWorkers)
module.exports.getInfrastructures = handleLambdaEvent(getInfrastructures)
module.exports.updateInfrastructures = handleLambdaEvent(updateInfrastructures)
module.exports.addWorkForceToInfrastructureAndGetOutPuts = handleLambdaEvent(
  addWorkForceToInfrastructureAndGetOutPuts
)

module.exports.getState = () => state
module.exports.getStateLambda = handleLambdaEvent(this.getState)
module.exports.getStateApi = handleApiEvent(this.getState)
module.exports.initDB = handleApiEvent(initDB)
