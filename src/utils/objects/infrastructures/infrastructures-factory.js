const uuid = require('uuid/v4')
const { RESSOURCES } = require("../../../utils/enums")
const { createInfrastructure } = require("./infrastructures")

module.exports.INFRASTRUCTURE_TYPE = {
  POWER_PLANT: "power_plant",
  GREENHOUSE: "greenhouse"
}

module.exports.WORK_TYPE = {
  MAKE_ELECTRICITY: "MAKE_ELECTRICITY",
  MAKE_RATIONS: "MAKE_RATIONS",
}

const infrastructuresProps = {
  [this.INFRASTRUCTURE_TYPE.POWER_PLANT]: {
    type: this.INFRASTRUCTURE_TYPE.POWER_PLANT,
    workersCapacity: 6,
    outPuts: [{
      ressource: RESSOURCES.ELECTRICITY,
      quantity: 15,
    }],
    workType: this.WORK_TYPE.MAKE_ELECTRICITY,
    workNeeded: 8
  },
  [this.INFRASTRUCTURE_TYPE.GREENHOUSE]: {
    type: this.INFRASTRUCTURE_TYPE.GREENHOUSE,
    workersCapacity: 6,
    outPuts: [{
      ressource: RESSOURCES.RATION,
      quantity: 8,
    }],
    workType: this.WORK_TYPE.MAKE_RATIONS,
    workNeeded: 10
  },
}

module.exports.infractuctureFactory = (type) => {
  return createInfrastructure({id: uuid(), ...infrastructuresProps[type]})
}