const { handleLambdaEvent } = require("../utils/event-handlers/lambda-event-handler")

const { supply } = require("./actions/supply")
const { work } = require("./actions/work")

module.exports.supply = handleLambdaEvent(supply)
module.exports.work = handleLambdaEvent(work)

