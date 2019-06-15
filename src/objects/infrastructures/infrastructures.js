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
  id,
  type,
  workersCapacity,
  outPut = [],
  workNeeded
}) => {
  return {
    id,
    type,
    workersCapacity,
    outPut,
    workNeeded
  }
}
