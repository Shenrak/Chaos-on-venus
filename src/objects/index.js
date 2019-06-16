const { readJsonFile } = require("../utils/read-json-file")
const { handleApiEvent } = require("../utils/event-handlers")
const { infractuctureFactory } = require("./infrastructures")
const { workerFactory } = require("./workers")

module.exports.getState = () => {
  const config = readJsonFile(__dirname, "config.json")

  const state = config.infrastructures.reduce(
    (accumulator, infrastructureConfig) => {
      const infrastructure = infractuctureFactory(infrastructureConfig.type)
      const infrastructures = [infrastructure, ...accumulator.infrastructures]

      const workers = infrastructureConfig.workers
        .map(type => workerFactory(type, infrastructure.id))
        .concat(accumulator.infrastructures)

      return {
        infrastructures,
        workers
      }
    },
    {
      infrastructures: [],
      workers: []
    }
  )

  console.log("INITIAL STATE", state)
  return state
}
module.exports.getStateApi = handleApiEvent(this.getState)
