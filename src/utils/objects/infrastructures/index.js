const { createInfrastructure } = require("./infrastructures")
const { INFRASTRUCTURE_TYPE, WORK_TYPE, infractuctureFactory } = require("./infrastructures-factory")

module.exports.INFRASTRUCTURE_TYPE = INFRASTRUCTURE_TYPE
module.exports.WORK_TYPE = WORK_TYPE

module.exports.createInfrastructure = createInfrastructure
module.exports.infractuctureFactory = infractuctureFactory