// {
//   type: this.WORKER_TYPE.ROBOT,
//   neededSupplies: [
//     {
//       ressource: RESSOURCES.ELECTRICITY,
//       quantity: 2
//     }
//   ],
//   skills: [
//     {
//       workType: WORK_TYPE.MAKE_ELECTRICITY,
//       efficiency: 2
//     }
//   ]
// }

module.exports.createWorker = ({
  id,
  type,
  neededSupplies = [],
  skills = [],
  assignedInfrastructure,
  planning
}) => {
  return {
    id,
    type,
    neededSupplies,
    skills,
    assignedInfrastructure,
    planning
  }
}
