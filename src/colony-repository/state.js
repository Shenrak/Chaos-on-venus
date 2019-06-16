const { readJsonFile } = require("../utils/read-json-file")

const { infractuctureFactory } = require("./objects/infrastructures")
const { workerFactory } = require("./objects/workers")

const config = readJsonFile(__dirname, process.env.CONFIG_FILE)

const { infrastructures, workers } = config.infrastructures.reduce(
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

const ressources = config.ressources

const state = {
  infrastructures,
  workers,
  ressources
}

console.log("INITIAL STATE", state)

module.exports.state = state
