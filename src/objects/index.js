const { readJsonFile } = require("../utils/read-json-file")
const { handleApiEvent } = require("../utils/event-handlers")
const { infractuctureFactory } = require("./infrastructures")
const { workerFactory } = require("./workers")

module.exports.testFunction = () => {
  const config = readJsonFile(__dirname, "config.json")
  
  const state = config.infrastructures.reduce(
    (accumulator, infrastructureConfig) => {
      const infrastructures = [
        infractuctureFactory(infrastructureConfig.type),
        ...accumulator.infrastructures
      ]
      const workers = infrastructureConfig.workers
        .map(workerFactory)
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

  console.log("STATE", state)
  return state
}
module.exports.testFunctionHandled = handleApiEvent(this.testFunction)
