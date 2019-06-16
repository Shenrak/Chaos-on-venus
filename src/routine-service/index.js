const { handleApiEvent } = require("../utils/event-handlers/api-event-handler")

const { day } = require("./routines/day")
const { routine } = require("./routines/another-routine")

module.exports.day = handleApiEvent(day)
module.exports.routine = handleApiEvent(routine)