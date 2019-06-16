const uuid = require('uuid/v4')
const { RESSOURCES } = require("../../utils/enums")
const { createInfrastructure } = require("./infrastructures")

module.exports.INFRASTRUCTURE_TYPE = {
  CENTRAL: "central",
  GREENHOUSE: "greenhouse"
}

module.exports.WORK_TYPE = {
  MAKE_ELECTRICITY: "MAKE_ELECTRICITY",
  MAKE_RATIONS: "MAKE_RATIONS",
}

const infrastructuresProps = {
  [this.INFRASTRUCTURE_TYPE.CENTRAL]: {
    type: this.INFRASTRUCTURE_TYPE.CENTRAL,
    workersCapacity: 6,
    outPuts: [{
      ressource: RESSOURCES.ELECTRICITY,
      quantity: 10,
    }],
    workType: this.WORK_TYPE.MAKE_ELECTRICITY,
    workNeeded: 10
  },
  [this.INFRASTRUCTURE_TYPE.GREENHOUSE]: {
    type: this.INFRASTRUCTURE_TYPE.GREENHOUSE,
    workersCapacity: 6,
    outPuts: [{
      ressource: RESSOURCES.RATION,
      quantity: 10,
    }],
    workType: this.WORK_TYPE.MAKE_RATIONS,
    workNeeded: 10
  },
}

module.exports.infractuctureFactory = (type) => {
  return createInfrastructure({id: uuid(), ...infrastructuresProps[type]})
}