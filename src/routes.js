const { getRessources, consume, refill, kill } = require("./controllers/ressource")
const { supply } = require("./controllers/actions")

module.exports.getRessources = getRessources
module.exports.consume = consume
module.exports.refill = refill
module.exports.kill = kill

module.exports.supply = supply