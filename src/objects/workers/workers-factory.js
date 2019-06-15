const { RESSOURCES } = require("../../utils/enums")
const { createWorker } = require("./workers")

module.exports.WORKER_TYPE = {
  HUMAN: "human",
  ROBOT: "robot"
}

const workersProps = {
  [this.WORKER_TYPE.HUMAN]: {
    type: this.WORKER_TYPE.HUMAN,
    dailyNeeds: [
      {
        ressourceType: RESSOURCES.RATION,
        quantity: 2
      },
      {
        ressourceType: RESSOURCES.ELECTRICITY,
        quantity: 1
      }
    ]
  },
  [this.WORKER_TYPE.ROBOT]: {
    type: this.WORKER_TYPE.ROBOT,
    dailyNeeds: [
      {
        ressourceType: RESSOURCES.ELECTRICITY,
        quantity: 4
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

module.exports.workerFactory = workersTypes => {
  return workersTypes.map(type => {
    const props = workersProps[type]
    return createWorker(props)
  })
}
