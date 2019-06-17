const { handleLambdaEvent } = require("../../utils/event-handlers")
const { queryArray } = require("./interfaces-tools")
//const { workers } = require("../state").state
const { update } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")
const { WORKER_TYPE } = require("../../utils/objects/workers")

module.exports.getWorkers = async query => {
  const workers = await readAll("Workers")
  return queryArray(workers)(query)
}

module.exports.updateWorker = async ({ id, changes }) => {
  let queryUpdate = "set "
  let variableQuery = {}
  queryUpdate += Object.keys(changes)
    .map(key => {
      console.log(key)
      variableQuery[`:${key}`] = changes[key]
      return `${key} = :${key}`
    })
    .join(",")

  await update("Workers", { id: id }, queryUpdate, variableQuery)
}

module.exports.updateWorkers = async (query, fields) => {
  const workers = await this.getWorkers(query)
  workers.forEach(worker => {
    this.updateWorker(worker.id, fields)
  })
}

const sicken = async ({ nbHurt }) => {
  const workers = await this.getWorkers({ type: WORKER_TYPE.HUMAN })
  console.log("WOOOOOOOOOOOOOOOOOOOOOOOOOOORKERSSSSSSSSSSSS", workers)
  workers.sort(() => Math.random() - 0.5)

  let i = 0
  let dead = 0
  workers.forEach(worker => {
    if (!worker.dead && i < nbHurt) {
      if (worker.sick) {
        console.log("WOORRRRRRKER SICK", worker)
        this.updateWorker({ id: worker.id, changes: { dead: true } })
        dead++
      } else {
        console.log("WOORRRRRRKER UNSICK", worker)
        this.updateWorker({ id: worker.id, changes: { sick: true } })
        i++
      }
    }
  })
  console.log(i + " human(s) were sickened, " + dead + " human(s) died.")

  return i + " human(s) were sickened, " + dead + " human(s) died."
}

module.exports.sickenHuman = handleLambdaEvent(sicken)
