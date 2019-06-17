const { queryArray } = require("./interfaces-tools")
const { modify } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")

module.exports.getInfrastructures = async ({ query }) => {
  const workers = await readAll("Infrastructures")
  console.log(workers)
  queryArray(workers)({ query })
}

module.exports.updateInfrastructures = async ({ id, changes }) => {
  let queryUpdate = "set "
  changes.forEach(async change => {
    queryUpdate += `${[change]} = ${change}`
  })

  console.log("queryUpdate : " +  queryUpdate)

  await modify("Infrastructures", { id: id }, `set ${queryUpdate}`, {})
}

module.exports.addWorkForceToInfrastructureAndGetOutPuts = ({
  infrastructureId,
  workForce
}) => {
  if(typeof workForce !== "number") {
    throw new Error("Invalid workForce", workForce)
  }

  console.log(
    `Starting work with ${workForce} on infrastrucutre ${infrastructureId}`
  )
  // FAKE QUERY
  const infrastructure = this.getInfrastructures({})[0]

  const oldTotalWorkState = infrastructure.totalWork
  const totalWork = workForce + oldTotalWorkState


  const nbOutPuts = Math.floor(totalWork / infrastructure.workNeeded)


  if (totalWork >= infrastructure.workNeeded) {
    infrastructure.totalWork = totalWork % infrastructure.workNeeded
  } else {
    infrastructure.totalWork = totalWork
  }

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
