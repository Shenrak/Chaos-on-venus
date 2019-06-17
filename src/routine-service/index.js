const { TASK } = require("../utils/objects/workers")
const { handleApiEvent } = require("../utils/event-handlers/api-event-handler")
const { $getState } = require("../utils/requests/ressources")
const { $consume, $refill } = require("../utils/requests/ressources")
const { supply, work, executeWork } = require("./tasks")

const {
  mayPlague,
  mayDamageRobot,
  mayMeteorFall
} = require("../random-events/index")

const findPlanningTask = (planning, hour) => {
  const planningTask = planning.find(planningTask => {
    return planningTask.startHour <= hour && planningTask.endHour >= hour
  })

  return planningTask || { task: TASK.DO_NOTHING }
}

const runDay = async () => {
  const state = await $getState()
  const { workers, infrastructures } = state

  const logs = {}

  for (let hour = 0; hour < 24; hour++) {
    const workForcesToAdd = []
    const ressourcesToConsume = []
    const ressourcesToRefill = []

    workers.forEach(worker => {
      const planningTask = findPlanningTask(worker.planning, hour)

      if (planningTask.task === TASK.WORK) {
        work(workers, infrastructures,)
      }

      if (planningTask.task === TASK.SUPPLY) {
        supply(workers, ressourcesToConsume)
      }
    })

    await executeWork(workForcesToAdd, ressourcesToConsume)

    const refillState = ressourcesToRefill.map(({ quantity, ressource }) => {
      return $refill({ quantity, ressource })
    })
    const consumeState = ressourcesToConsume.map(({ quantity, ressource }) => {
      return $consume({ quantity, ressource })
    })

    const dayLogs = {}
    if (JSON.stringify(workForcesToAdd) !== "[]") {
      dayLogs.workForcesToAdd = workForcesToAdd
    }
    if (JSON.stringify(ressourcesToConsume) !== "[]") {
      dayLogs.ressourcesToConsume = ressourcesToConsume
    }
    if (JSON.stringify(ressourcesToRefill) !== "[]") {
      dayLogs.ressourcesToRefill = ressourcesToRefill
    }

    const plagueLog = mayPlague()
    const damageLog = mayDamageRobot()
    const meteorLog = mayMeteorFall()

    if (plagueLog !== "") {
      dayLogs.plagueLog = plagueLog
    }

    if (damageLog !== "") {
      dayLogs.damageLog = damageLog
    }

    if (meteorLog !== "") {
      dayLogs.meteorLog = meteorLog
    }

    if (JSON.stringify(dayLogs) !== "{}") {
      logs[`${hour}:00`] = dayLogs
    }
    await Promise.all(consumeState)
    await Promise.all(refillState)
  }

  return logs
}

// const work = (infrastructure, workForce) => {
//   const nbOutPuts = Math.floor(workForce / infrastructure.workNeeded)

//   if (workForce > infrastructure.workNeeded) {
//     infrastructure.totalWork = workForce % infrastructure.workNeeded
//   } else {
//     infrastructure.totalWork = workForce + workForce
//   }

//   return infrastructure.outPuts
//     .map(outPut => ({
//       ...outPut,
//       quantity: outPut.quantity * nbOutPuts
//     }))
//     .filter(outPut => outPut.quantity > 0)
// }

module.exports.runDay = handleApiEvent(runDay)
