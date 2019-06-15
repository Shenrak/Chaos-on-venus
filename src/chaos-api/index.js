const { checkRessources } = require("./check-ressources")
const { handleApiEvent } = require("../utils/event-handlers")

module.exports.checkRessources = handleApiEvent(checkRessources)