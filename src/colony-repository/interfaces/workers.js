const { queryArray } = require("./interfaces-tools")
//const { workers } = require("../state").state
const { modify } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")

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

module.exports.updateWorkers = async (query, fields) => {
  const workers = await this.getWorkers(query)
  workers.forEach(worker => {
    this.updateWorker(worker.id, fields)
  })
}
