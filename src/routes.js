const { getRessources, consume, refill, kill } = require("./controllers/ressource")
const { day } = require("./controllers/routines")

module.exports.getRessources = getRessources
module.exports.day = day