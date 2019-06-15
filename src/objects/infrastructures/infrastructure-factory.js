const { RESSOURCES } = require("../enums/index")
const { createInfrastructure } = require("./infrastructure")

module.exports.INFRASTRUCTURE_TYPE = {
  CENTRAL: "central",
  GREENHOUSE: "greenhouse"
}

const infrastructuresProps = {
  [this.INFRASTRUCTURE_TYPE.CENTRAL]: {
    type: this.INFRASTRUCTURE_TYPE.CENTRAL,
    workersCapacity: 6,
    outPut: {
      ressourceType: RESSOURCES.ELECTRICITY,
      quantity: 10,
    },
    workNeeded: 10
  },
  [this.INFRASTRUCTURE_TYPE.GREENHOUSE]: {
    type: this.INFRASTRUCTURE_TYPE.GREENHOUSE,
    workersCapacity: 6,
    outPut: {
      ressourceType: RESSOURCES.RATION,
      quantity: 10,
    },
    workNeeded: 10
  },
}

module.exports.infractuctureFactory = (infrastructureTypes) => {
  return infrastructureTypes.map(type => {
    const props = infrastructuresProps[type]
    return createInfrastructure(props)
  })
}