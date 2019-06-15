// {
//   type: this.INFRASTRUCTURE_TYPE.GREENHOUSE,
//   workersCapacity: 6,
//   outPut: {
//     ressourceType: RESSOURCES.RATION,
//     quantity: 10,
//   },
//   workNeeded: 10
// },

module.exports.createInfrastructure = ({
  type,
  workersCapacity,
  outPut,
  workNeeded
}) => {
  return {
    type,
    workersCapacity,
    outPut: this.createInfrastructureOutPut(outPut),
    workNeeded
  }
}

module.exports.createInfrastructureOutPut = ({
  ressourceType,
  quantity,
}) => {
  return {
    ressourceType,
    quantity,
  }
}