
const { invokeLambda } = require("./request-tools")

exports.$getRessources = () => {
  const result = invokeLambda({
    FunctionName: "getRessources",
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$consume = ({ ressource, quantity }) => {
  const result = invokeLambda({
    FunctionName: "consume",
    Payload: { ressource, quantity }
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$refill = ({ ressource, quantity }) => {
  const result = invokeLambda({
    FunctionName: "refill",
    Payload: { ressource, quantity }
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$kill = ({ beingType }) => {
  const result = invokeLambda({
    FunctionName: "kill",
    Payload: { beingType }
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$supply = ({ beingType }) => {
  const result = invokeLambda({
    FunctionName: "supply",
    Payload: { beingType }
  })
  return result
}

exports.$getState = () => {
  const result = invokeLambda({
    FunctionName: "getStateLambda",
  })
  return result
}
