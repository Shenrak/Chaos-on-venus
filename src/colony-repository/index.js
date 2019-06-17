const { handleApiEvent, handleLambdaEvent } = require("../utils/event-handlers")

const { state } = require("./state")
const { consume, refill, getRessources } = require("./interfaces/ressources")
const { getWorkers } = require("./interfaces/workers")
const { getInfrastructures, setInfrastructures } = require("./interfaces/infrastructures")


module.exports.consume = handleLambdaEvent(consume)
module.exports.refill = handleLambdaEvent(refill)
module.exports.getRessources = handleLambdaEvent(getRessources)

module.exports.getWorkers = handleLambdaEvent(getWorkers)
module.exports.getInfrastructures = handleLambdaEvent(getInfrastructures)
module.exports.setInfrastructures = handleLambdaEvent(setInfrastructures)

module.exports.getState = () => state
module.exports.getStateLambda = handleLambdaEvent(this.getState)
module.exports.getStateApi = handleApiEvent(this.getState)
