// {
//   type: this.INFRASTRUCTURE_TYPE.GREENHOUSE,
//   workersCapacity: 6,
//   outPuts: {
//     ressource: RESSOURCES.RATION,
//     quantity: 10,
//   },
//   workNeeded: 10
// },

module.exports.createInfrastructure = ({
  id,
  type,
  workersCapacity,
  outPuts = [],
  workType,
  workNeeded
}) => {
  return {
    id,
    type,
    workersCapacity,
    outPuts,
    workNeeded,
    workType,
    totalWork: 0
  }
}
