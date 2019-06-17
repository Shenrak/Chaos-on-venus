const { queryArray, setArrayElements } = require("./interfaces-tools")
const { state } = require("../state")
const infrastructures = state.infrastructures

module.exports.getInfrastructures = ({ query }) =>
  queryArray(infrastructures)({ query })

module.exports.setInfrastructures = ({ query, props }) => {
  const newState = setArrayElements({ query, props })
  state.infrastructures = newState
  console.log("newState", newState)
  return queryArray(newState)({query})
}
