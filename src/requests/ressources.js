
const { invokeLambda } = require("./request-tools")

exports.$consume = ({ ressource, quantity }) => {
  const result = invokeLambda({
    FunctionName: "consume",
    Payload: JSON.stringify({ ressource, quantity })
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$refill = ({ ressource, quantity }) => {
  const result = invokeLambda({
    FunctionName: "refill",
    Payload: JSON.stringify({ ressource, quantity })
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$kill = ({ beingType }) => {
  const result = invokeLambda({
    FunctionName: "kill",
    Payload: JSON.stringify({ beingType })
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$supply = ({ beingType }) => {
  const result = invokeLambda({
    FunctionName: "supply",
    Payload: JSON.stringify({ beingType })
  })
  return result
}
