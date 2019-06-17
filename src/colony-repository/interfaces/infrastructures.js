const { queryArray, setArrayElements } = require("./interfaces-tools")
const { state } = require("../state")
const infrastructures = state.infrastructures

module.exports.getInfrastructures = ({ query = {} }) =>
  queryArray(infrastructures)({ query })

module.exports.setInfrastructures = ({ query = {}, props }) => {
  const newState = setArrayElements({ query, props })
  state.infrastructures = newState
  console.log("newState", newState)
  return queryArray(newState)({ query })
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
