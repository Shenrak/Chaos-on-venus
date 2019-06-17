const { TASK } = require("../utils/objects/workers")
const { handleApiEvent } = require("../utils/event-handlers/api-event-handler")
const { $getState } = require("../utils/requests/ressources")
const {
  $addWorkForceToInfrastructureAndGetOutPuts
  //$setInfrastructures
} = require("../utils/requests/infrastructures")
// const { $consume, $refill } = require("../utils/requests/ressources")

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
        const infrastructure = infrastructures.find(
          i => i.id === worker.assignedInfrastructure
        )

        if (!infrastructure) {
          throw new Error("infrastructure not found")
        }

        const workForce = getWorkForce(worker, infrastructure)

        if (
          !workForcesToAdd.find(w => w.infrastructureId === infrastructure.id)
        ) {
          workForcesToAdd.push({
            infrastructureId: infrastructure.id,
            workForce: 0
          })
        }
        workForcesToAdd.find(
          w => w.infrastructureId === infrastructure.id
        ).workForce += workForce
      }

      if (planningTask.task === TASK.SUPPLY) {
        worker.neededSupplies.map(({ ressource, quantity }) => {
          if (!ressourcesToConsume.find(r => r.ressource === ressource)) {
            ressourcesToConsume.push({ ressource, quantity })
          } else {
            ressourcesToConsume.find(
              r => r.ressource === ressource
            ).quantity += quantity
          }
        })
      }
    })

    const workOutPuts = await Promise.all(
      workForcesToAdd.map(w => $addWorkForceToInfrastructureAndGetOutPuts(w))
    )
    workOutPuts.forEach(workOutPut => {
      if (workOutPut.outPuts) {
        workOutPut.outPuts.forEach(ressourceToRefill => {
          const temp = ressourcesToRefill.find(
            r => r.ressource === ressourceToRefill.ressource
          )
          if (temp) {
            temp.quantity += ressourceToRefill.quantity
          } else {
            ressourcesToRefill.push({
              ressource: ressourceToRefill.ressource,
              quantity: ressourceToRefill.quantity
            })
          }
        })
      }
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
    if (JSON.stringify(dayLogs) !== "{}") {
      logs[`${hour}:00`] = dayLogs
    }
  }

  return logs
}

const getWorkForce = (worker, infrastructure) => {
  const skill = worker.skills.find(s => s.workType === infrastructure.workType)
  const workForce = skill ? skill.efficiency : 1
  return workForce
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
