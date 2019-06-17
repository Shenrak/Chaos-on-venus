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
//   ],
//   planning: [{
//   startHour: 7,
//   endHour: 11,
//   task: TASK.WORK
// },{
//   startHour: 12,
//   task: TASK.SUPPLY
// },{
//   startHour: 13,
//   endHour: 18,
//   task: TASK.WORK
// },{
//   startHour: 19,
//   task: TASK.SUPPLY
// }]
// }

module.exports.createWorker = ({
  id,
  type,
  neededSupplies = [],
  skills = [],
  assignedInfrastructure,
  planning,
  sick = false,
  dead = false
}) => {
  planning = planning.map(planningTask => {
    if(!planningTask.endHour) {
      planningTask.endHour = planningTask.startHour
    }
    return planningTask
  })

  return {
    id,
    type,
    neededSupplies,
    skills,
    assignedInfrastructure,
    planning,
    sick,
    dead
  }
}
