const { queryArray } = require("./interfaces-tools")
const { update } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")

module.exports.getInfrastructures = async ({ query }) => {
  const infrastructures = await readAll("Infrastructures")
  console.log(infrastructures)
  return queryArray(infrastructures)({ query })
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
    id: infrastructureId
  })

  let infrastructure = infrastructureTab.length !== 0 ? infrastructureTab[0] : undefined
  
  if (!infrastructure) {
    throw new Error("pas d'infrastructure valide pour cette id")
  }

  const oldTotalWorkState = infrastructure.totalWork
  const totalWork = workForce + oldTotalWorkState

  const nbOutPuts = Math.floor(totalWork / infrastructure.workNeeded)

  //FAIRE l'UPDATE a la place --> PB CAR total work envoue NAN
  if (totalWork >= infrastructure.workNeeded) {
    infrastructure.totalWork = totalWork % infrastructure.workNeeded
  } else {
    infrastructure.totalWork = totalWork
  }
  console.log("INFRASTRUCTUREEEEEEE !!!!!", infrastructure)
  const outPuts = infrastructure.outPuts
    .map(outPut => ({
      ...outPut,
      quantity: outPut.quantity * nbOutPuts
    }))
    .filter(outPut => outPut.quantity > 0)

  console.log(`Work output : ${outPuts}`)

  return {
    WARNING: "THIS LAMBDA DONT CARE ABOUT ARGUMENTS FOR THE MOMENT",
    oldTotalWork: oldTotalWorkState,
    newTotalWork: totalWork,
    workForce,
    outPuts
  }
}
