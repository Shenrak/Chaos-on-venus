const { invokeLambda } = require("./request-tools")


exports.$getInfrastructures = (query = {}) => {
  const result = invokeLambda({
    FunctionName: "getInfrastructures",
    Payload: query
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$setInfrastructures = ({query = {}, props}) => {
  const result = invokeLambda({
    FunctionName: "setInfrastructures",
    Payload: {query, props}
    // InvocationType: 'RequestReponse'
  })
  return result
}
