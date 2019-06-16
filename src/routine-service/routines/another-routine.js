const { getState } = require("../../colony-repository")
const { $refill, $consume } = require("../../utils/requests/ressources")

const EVENT_TYPE = {
  SUPPLY: "SUPPLY",
  WORK: "WORK"
}

const dayEvent = (time, type) => ({
  time,
  type
})

const dayEvents = [
  dayEvent("8:00", EVENT_TYPE.WORK),
  dayEvent("9:00", EVENT_TYPE.WORK),
  dayEvent("10:00", EVENT_TYPE.WORK),
  dayEvent("11:00", EVENT_TYPE.WORK),
  dayEvent("12:00", EVENT_TYPE.SUPPLY),
  dayEvent("13:00", EVENT_TYPE.WORK),
  dayEvent("14:00", EVENT_TYPE.WORK),
  dayEvent("15:00", EVENT_TYPE.WORK),
  dayEvent("16:00", EVENT_TYPE.WORK),
  dayEvent("17:00", EVENT_TYPE.WORK),
  dayEvent("19:00", EVENT_TYPE.SUPPLY)
]

const dayLog = (time, value) => ({
  time,
  value
})

module.exports.routine = async () => {
  const awaiters = []
  const state = getState()

  const dayLogs = dayEvents.map(event => {
    const dayMessages = []
    const ressourcesToConsume = []
    const ressourcesToRefill = []

    switch (event.type) {
      case EVENT_TYPE.WORK:
        state.workers.map(worker => {
          const infrastructure = state.infrastructures.find(
            i => worker.assignedInfrastructure === i.id
          )

          const { totalWork, outPuts, workType, workNeeded } = infrastructure

          const skill = worker.skills.find(s => s.type === workType)
          const workForce = skill ? skill.efficiency : 1
          const actualWork = totalWork + workForce

          if (actualWork >= workNeeded) {
            outPuts.map(({ ressource, quantity }) => {
              if (!ressourcesToRefill.find(r => r.ressource === ressource)) {
                ressourcesToRefill.push({ ressource, quantity })
              } else {
                ressourcesToRefill.find(
                  r => r.ressource === ressource
                ).quantity += quantity
              }
            })
            infrastructure.totalWork = actualWork - workNeeded
          } else {
            infrastructure.totalWork = actualWork
          }
        })
        break
      case EVENT_TYPE.SUPPLY:
        state.workers.forEach(worker => {
          worker.neededSupplies.forEach(({ ressource, quantity }) => {
            if (!ressourcesToConsume.find(r => r.ressource === ressource)) {
              ressourcesToConsume.push({ ressource, quantity })
            } else {
              ressourcesToConsume.find(
                r => r.ressource === ressource
              ).quantity += quantity
            }
          })
        })
        break

      default:
        throw new Error("Unknown event type")
    }

    ressourcesToConsume.forEach(r => {
      awaiters.push($consume(r).then(res => dayMessages.push(res)))
    })
    ressourcesToRefill.forEach(r => {
      awaiters.push($refill(r).then(res => dayMessages.push(res)))
    })

    awaiters.push(...dayMessages)
    return dayLog(event.time, dayMessages)
  })

  await Promise.all(awaiters)
  return dayLogs.filter(log => log.value.length > 0)
}
