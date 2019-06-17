const { TASK } = require("../utils/objects/workers")
const { handleApiEvent } = require("../utils/event-handlers/api-event-handler")
const { $getState } = require("../utils/requests/ressources")
// const {
//   $getInfrastructures
//   //$setInfrastructures
// } = require("../utils/requests/infrastructures")
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

    workForcesToAdd.forEach(w => {
      const infrastructure = infrastructures.find(
        infrastructure => w.infrastructureId === infrastructure.id
      )
      const workOutPuts = getWorkOutPuts(infrastructure, w.workForce)

      workOutPuts.forEach(ressourceToRefill => {
        if (
          ressourcesToRefill.find(
            r => r.ressource === ressourceToRefill.ressource
          )
        ) {
          ressourcesToRefill.push({
            ressource: ressourceToRefill.ressource,
            quantity: 0
          })
        }
        const temp = ressourcesToRefill.find(
          r => r.ressource === ressourceToRefill.ressource
        )
        temp.quantity += ressourceToRefill.quantity
      })
    })

    console.log("workForcesToAdd", workForcesToAdd)
    console.log("ressourcesToConsume", ressourcesToConsume)
    console.log("ressourcesToRefill", ressourcesToRefill)
  }
}

const getWorkForce = (worker, infrastructure) => {
  const skill = worker.skills.find(s => s.workType === infrastructure.workType)
  const workForce = skill ? skill.efficiency : 1
  return workForce
}


const getWorkOutPuts = (infrastructure, workForce) => {
  const nbOutPuts = Math.floor(workForce / infrastructure.workNeeded)

  if (workForce > infrastructure.workNeeded) {
    infrastructure.totalWork = workForce % infrastructure.workNeeded
  } else {
    infrastructure.totalWork = workForce + workForce
  }

  return infrastructure.outPuts
    .map(outPut => ({
      ...outPut,
      quantity: outPut.quantity * nbOutPuts
    }))
    .filter(outPut => outPut.quantity > 0)
}

// const dayLog = (time, value) => ({
//   time,
//   value
// })

// const work = async ({ infrastructureId, workForce }) => {
//   console.log("STARTING WORK...", { infrastructureId, workForce })
//   const infrastructure = await $getInfrastructures({ id: infrastructureId })

//   let finalTotalWork,
//     nbOutPuts,
//     outPutMessages = []

//   const actualWork = infrastructure.totalWork + workForce
//   if (actualWork > infrastructure.workNeeded) {
//     nbOutPuts = Math.floor(actualWork / infrastructure.workNeeded)
//     finalTotalWork = actualWork % infrastructure.workNeeded
//   } else {
//     finalTotalWork = actualWork + workForce
//   }

//   // $setInfrastructures({
//   //   query: { id: infrastructureId },
//   //   props: { totalWork: finalTotalWork }
//   // }).then(res => console.log("SETINFRA", res))

//   if (nbOutPuts) {
//     outPutMessages = infrastructure.outPuts
//       .map(outPut => ({
//         ...outPut,
//         quantity: outPut.quantity * nbOutPuts
//       }))
//       .map(outPut =>
//         $refill({ quantity: outPut.quantity, ressource: outPut.ressource })
//       )
//   }

//   console.log("outPutMessages", outPutMessages)
// }

// const runDay = async () => {
//   const awaiters = []
//   const dayLogs = []

//   const state = await $getState()

//   const {workers, infrastructures} = state
//   for (let hour = 0; hour < 24; hour++) {
//     const dayMessages = []
//     const ressourcesToConsume = []
//     const ressourcesToRefill = []
//     let workForcesToAdd = []

//     for (const i in workers) {
//       const worker = workers[i]

//       const planningTask = findPlanningTask(worker.planning, hour)

//       if (planningTask.task === TASK.WORK) {
//         const infrastructure = infrastructures.find(i => i.id === worker.assignedInfrastructure)

//         if(!infrastructure) {
//           throw new Error("Bad infrastructure id", worker.assignedInfrastructure)
//         }

//         const { workType } = infrastructure

//         const skill = worker.skills.find(s => s.type === workType)
//         const workForce = skill ? skill.efficiency : 1

//         if (
//           !workForcesToAdd.find(w => w.infrastructureId === infrastructure.id)
//         ) {
//           workForcesToAdd.push({
//             infrastructureId: infrastructure.id,
//             workForce
//           })
//         } else {
//           workForcesToAdd = workForcesToAdd.map(w => {
//             if (w.infrastructureId === infrastructure.id) {
//               w.workForce += workForce
//             }
//             return w
//           })
//         }
//         console.log("workForcesToAdd",workForcesToAdd)
//         //Promise.resolve(workForcesToAdd)
//       }

//       if (planningTask.task === TASK.SUPPLY) {
//         worker.neededSupplies.forEach(({ ressource, quantity }) => {
//           if (!ressourcesToConsume.find(r => r.ressource === ressource)) {
//             ressourcesToConsume.push({ ressource, quantity })
//           } else {
//             ressourcesToConsume.find(
//               r => r.ressource === ressource
//             ).quantity += quantity
//           }
//         })
//       }
//     }

//     workForcesToAdd.forEach(w => {
//       awaiters.push(work(w).then(res => dayMessages.push(res)))
//     })
//     ressourcesToConsume.forEach(r => {
//       awaiters.push($consume(r).then(res => dayMessages.push(res)))
//     })
//     ressourcesToRefill.forEach(r => {
//       awaiters.push($refill(r).then(res => dayMessages.push(res)))
//     })

//     awaiters.push(...dayMessages)
//     dayLogs.push(dayLog(hour, dayMessages))
//     //return Promise.resolve(dayLogs)
//   }

//   await Promise.all(awaiters)
//   console.log("END")
//   return dayLogs.filter(log => log.value.length > 0)
// }

module.exports.runDay = handleApiEvent(runDay)
