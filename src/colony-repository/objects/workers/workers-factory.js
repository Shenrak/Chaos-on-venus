const uuid = require("uuid/v4")
const { RESSOURCES } = require("../../../utils/enums")
const { WORK_TYPE } = require("../infrastructures")
const { createWorker } = require("./workers")



module.exports.WORKER_TYPE = {
  HUMAN: "human",
  ROBOT: "robot"
}

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
    ]
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
    ]
  }
}

module.exports.workerFactory = (type, assignedInfrastructure) => {
  return createWorker({
    id: uuid(),
    assignedInfrastructure,
    ...workersProps[type]
  })
}
