const { handleLambdaEvent } = require("../utils/event-handlers/lambda-event-handler")

const {
  consume,
  refill,
  kill,
  getRessources
} = require("./repository/ressources")
const { supply } = require("./actions/supply")
const { work } = require("./actions/work")

module.exports.consume = handleLambdaEvent(consume)
module.exports.refill = handleLambdaEvent(refill)
module.exports.kill = handleLambdaEvent(kill)

module.exports.supply = handleLambdaEvent(supply)
module.exports.work = handleLambdaEvent(work)

module.exports.getRessources = handleLambdaEvent(getRessources)
