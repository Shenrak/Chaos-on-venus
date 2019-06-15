const { handleApiEvent } = require("../utils/event-handlers/api-event-handler")

const { day } = require("./routines/day")

module.exports.day = handleApiEvent(day)