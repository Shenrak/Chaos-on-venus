const { createWorker } = require("./workers")
const { WORKER_TYPE, TASK, workerFactory } = require("./workers-factory")

module.exports.workerFactory = workerFactory
module.exports.createWorker = createWorker

module.exports.WORKER_TYPE = WORKER_TYPE
module.exports.TASK = TASK