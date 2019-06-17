const uuid = require("uuid/v4")
const { RESSOURCES } = require("../../../utils/enums")
const { WORK_TYPE } = require("../infrastructures")
const { createWorker } = require("./workers")


module.exports.TASK = {
  SUPPLY: "SUPPLY",
  WORK: "WORK",
  DO_NOTHING: "DO_NOTHING"
}


module.exports.WORKER_TYPE = {
  HUMAN: "human",
  ROBOT: "robot"
}

const standardPlanning = [{
  startHour: 7,
  endHour: 11,
  task: this.TASK.WORK
},{
  startHour: 12,
  task: this.TASK.SUPPLY
},{
  startHour: 13,
  endHour: 18,
  task: this.TASK.WORK
},{
  startHour: 19,
  task: this.TASK.SUPPLY
}]

const workersProps = {
  [this.WORKER_TYPE.HUMAN]: {
    type: this.WORKER_TYPE.HUMAN,
    neededSupplies: [
      {
        ressource: RESSOURCES.RATION,
        quantity: 1
      },
      {
        ressource: RESSOURCES.ELECTRICITY,
        quantity: 0.5
      }
    ],
    planning: standardPlanning
  },
  [this.WORKER_TYPE.ROBOT]: {
    type: this.WORKER_TYPE.ROBOT,
    neededSupplies: [
      {
        ressource: RESSOURCES.ELECTRICITY,
        quantity: 2
      }
    ],
    skills: [
      {
        workType: WORK_TYPE.MAKE_ELECTRICITY,
        efficiency: 2
      }
    ],
    planning: standardPlanning
  }
}

module.exports.workerFactory = (type, assignedInfrastructure) => {
  return createWorker({
    id: uuid(),
    assignedInfrastructure,
    ...workersProps[type]
  })
}
