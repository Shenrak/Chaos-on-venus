const { readJsonFile } = require("../utils/read-json-file")

const { infractuctureFactory } = require("../utils/objects/infrastructures")
const { workerFactory } = require("../utils/objects/workers")

const initState = (dirname, configFile) => {
  const config = readJsonFile(dirname, configFile)

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
  return state
}

module.exports.state = initState(__dirname, process.env.CONFIG_FILE)
