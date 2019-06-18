const { invokeLambda } = require("./request-tools")


exports.$getWorkers = (query = {}) => {
  const result = invokeLambda({
    FunctionName: "getWorkers",
    Payload: query
    // InvocationType: 'RequestReponse'
  })
  return result
}