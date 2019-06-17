const { handleLambdaEvent } = require("../utils/event-handlers")
const { queryArray } = require("./interfaces-tools")
//const { workers } = require("../state").state
const { modify } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")
const { WORKER_TYPE } = require("../../utils/objects/workers")

module.exports.getWorkers = async ({ query }) => {
  const workers = await readAll("Workers")
  console.log(workers)
  queryArray(workers)({ query })
}

module.exports.updateWorker = async (id, updatedWorker) => {
  let queryUpdate = "set "

  Object.keys(updatedWorker).forEach(async key => {
    queryUpdate += `${key} = ${updatedWorker[key]}`
  })

  console.log(queryUpdate)
  await modify("Workers", { id: id }, `set ${updatedWorker}`, {})
}

const sicken = async ({ nbHurt }) => {
  const workers = await this.getWorkers({ type: WORKER_TYPE.HUMAN })
  workers.sort(() => Math.random() - 0.5)

  let i = 0
  let dead = 0
  for (const worker in workers) {
    if (!worker.dead && i < nbHurt) {
      if (worker.sick) {
        this.updateWorker({ id: worker.id, changes: [{ dead: true }] })
        dead++
      } else {
        this.updateWorker({ id: worker.id, changes: [{ sick: true }] })
        i++
      }
    }
  }
  console.log(i + " human(s) were sickened, " + dead + " human(s) died.")
}

module.exports.sickenHuman = handleLambdaEvent(sicken)
