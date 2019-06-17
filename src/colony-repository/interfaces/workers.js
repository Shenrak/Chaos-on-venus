const { handleLambdaEvent } = require("../utils/event-handlers")
const { queryArray } = require("./interfaces-tools")
//const { workers } = require("../state").state
const { modify } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")

module.exports.sickenHuman = handleLambdaEvent(sicken)

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
  const workers = await this.getWorkers({ type: "" })
  workers.sort(() => Math.random() - 0.5)

  let i = 0
  for (const worker in workers) {
    if (!worker.dead && i < nbHurt) {
      if (worker.sick) {
        this.updateWorker({ id: worker.id, changes: [{ dead: true }] })
      } else {
        this.updateWorker({ id: worker.id, changes: [{ sick: true }] })
      }
      i++
    }
  }
}
