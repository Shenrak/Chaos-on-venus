const { handleLambdaEvent } = require("../utils/event-handlers")
const { queryArray } = require("./interfaces-tools")
const { workers } = require("../state").state

const sicken = async ({ nbHurt }) => {
  const workers = await this.getWorkers({type: ""})
  workers.sort(() => Math.random() - 0.5)

  let i = 0
  for (const worker in workers) {
    if (!worker.dead && i < nbHurt) {
      if (worker.sick) {
        updateWorker({ id: worker.id, changes: [{ dead: true }] })
      } else {
        updateWorker({ id: worker.id, changes: [{ sick: true }] })
      }
      i++
    }
  }
}

module.exports.sickenHuman = handleLambdaEvent(sicken)

module.exports.getWorkers = ({ query }) => queryArray(workers)({ query })
