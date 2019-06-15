const { createInfrastructure } = require("./infrastructures")
const { INFRASTRUCTURE_TYPE, infractuctureFactory } = require("./infrastructures-factory")

module.exports.createInfrastructure = createInfrastructure
module.exports.INFRASTRUCTURE_TYPE = INFRASTRUCTURE_TYPE
module.exports.infractuctureFactory = infractuctureFactory