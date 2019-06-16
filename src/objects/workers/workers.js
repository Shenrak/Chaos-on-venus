// {
//   type: this.INFRASTRUCTURE_TYPE.GREENHOUSE,
//   workersCapacity: 6,
//   outPut: {
//     ressourceType: RESSOURCES.RATION,
//     quantity: 10,
//   },
//   workNeeded: 10
// },

module.exports.createWorker = ({
  id,
  type,
  neededSupplies = [],
  skills = [],
  assignedInfrastructure
}) => {
  return {
    id,
    type,
    neededSupplies,
    skills,
    assignedInfrastructure
  }
}
