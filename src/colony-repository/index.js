const { handleApiEvent, handleLambdaEvent } = require("../utils/event-handlers")
const { state } = require("./state")
const { consume, refill, getRessources } = require("./ressources/ressources")


module.exports.consume = handleLambdaEvent(consume)
module.exports.refill = handleLambdaEvent(refill)
module.exports.getRessources = handleLambdaEvent(getRessources)

module.exports.getState = () => state
module.exports.getStateApi = handleApiEvent(this.getState)
