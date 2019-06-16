const { RESSOURCES } = require("../../utils/enums")
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
        ressourceType: RESSOURCES.RATION,
        quantity: 1
      },
      {
        ressourceType: RESSOURCES.ELECTRICITY,
        quantity: 0.5
      }
    ]
  },
  [this.WORKER_TYPE.ROBOT]: {
    type: this.WORKER_TYPE.ROBOT,
    neededSupplies: [
      {
        ressourceType: RESSOURCES.ELECTRICITY,
        quantity: 2
      }
    ],
    skills: [
      {
        ressourceType: RESSOURCES.ELECTRICITY,
        efficiency: 2
      }
    ]
  }
}

module.exports.workerFactory = type => {
  return createWorker(workersProps[type])
}
