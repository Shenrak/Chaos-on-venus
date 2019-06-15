const { createInfrastructure } = require("./infrastructure")
const { INFRASTRUCTURE_TYPE, infractuctureFactory } = require("./infrastructure-factory")

module.exports.createInfrastructure = createInfrastructure
module.exports.INFRASTRUCTURE_TYPE = INFRASTRUCTURE_TYPE
module.exports.infractuctureFactory = infractuctureFactory