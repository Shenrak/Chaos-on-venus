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
  dailyNeeds = [],
  skills = [],
}) => {
  return {
    id,
    type,
    dailyNeeds,
    skills,
  }
}