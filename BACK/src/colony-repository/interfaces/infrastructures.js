const { queryArray } = require("./interfaces-tools")
const { update } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")

module.exports.getInfrastructures = async ({ query }) => {
  const infrastructures = await readAll("Infrastructures")
  return queryArray(infrastructures)(query)
}

module.exports.updateInfrastructures = async ({ id, changes }) => {
  let queryUpdate = "set "
  let variableQuery = {}
  queryUpdate += Object.keys(changes)
    .map(key => {
      console.log(key)
      variableQuery[`:${key}`] = changes[key]
      return `${key} = :${key}`
    })
    .join(",")

  await update("Infrastructures", { id: id }, queryUpdate, variableQuery)
}

module.exports.addWorkForceToInfrastructureAndGetOutPuts = async ({
  infrastructureId,
  workForce
}) => {
  if (typeof workForce !== "number") {
    throw new Error("Invalid workForce", workForce)
  }

  console.log(
    `Starting work with ${workForce} on infrastrucutre ${infrastructureId}`
  )
  const infrastructureTab = await this.getInfrastructures({
    query: {
      id: infrastructureId
    }
  })

  let infrastructure =
    infrastructureTab.length !== 0 ? infrastructureTab[0] : undefined

  if (!infrastructure) {
    throw new Error("pas d'infrastructure valide pour cet id", infrastructureId)
  }

  const oldTotalWorkState = infrastructure.totalWork
  const totalWork = workForce + oldTotalWorkState

  const nbOutPuts = Math.floor(totalWork / infrastructure.workNeeded) // determine nbRessources

  console.log("oldTotalWorkState", infrastructure.totalWork)
  console.log("totalWork", totalWork)
  console.log("nbOutPuts", nbOutPuts)
  console.log("infrastructure", infrastructure)
  console.log("workForce", workForce)
  console.log("nbOutPuts", nbOutPuts)

  if (totalWork >= infrastructure.workNeeded) {
    // Attributes the rest of work
    infrastructure.totalWork = totalWork % infrastructure.workNeeded
  } else {
    infrastructure.totalWork = totalWork
  }

  //Update database
  this.updateInfrastructures({
    id: infrastructureId,
    changes: { totalWork: infrastructure.totalWork }
  })

  const outPuts = infrastructure.outPuts
    .map(outPut => ({
      ...outPut,
      quantity: outPut.quantity * nbOutPuts
    }))
    .filter(outPut => outPut.quantity > 0)

  return {
    oldTotalWork: oldTotalWorkState,
    newTotalWork: totalWork,
    workForce,
    outPuts
  }
}
