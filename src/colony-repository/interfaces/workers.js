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

module.exports.updateWorker = async ({ id, changes }) => {
  let queryUpdate = "set "

  changes.forEach(async change => {
    queryUpdate += `${[change]} = ${change}`
  })

  console.log(queryUpdate)
  
  await modify("Workers", { id: id }, `set ${queryUpdate}`, {})
}

module.exports.updateWorkers = async (query, fields) => {
  const workers = await this.getWorkers(query)
  workers.forEach(worker => {
    this.updateWorker(worker.id, fields)
  })
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
