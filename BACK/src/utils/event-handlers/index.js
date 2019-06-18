const { handleApiEvent } = require("./api-event-handler")
const { handleLambdaEvent } = require("./lambda-event-handler")

module.exports = {
  handleApiEvent,
  handleLambdaEvent
}