var aws = require("aws-sdk")
const { invokeLambda, lambdaInvokeResponseHandler } = require("./request-tools")
var lambda = new aws.Lambda({
  region: "eu-west-3" //change to your region
})

exports.$consume = ({ ressource, quantity }, callback) => {
  const result = invokeLambda({
    FunctionName: "consume",
    Payload: JSON.stringify({ ressource, quantity })
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$refill = ({ ressource, quantity }, callback) => {
  const result = invokeLambda({
    FunctionName: "refill",
    Payload: JSON.stringify({ ressource, quantity })
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$kill = ({ beingType }, callback) => {
  const result = invokeLambda({
    FunctionName: "kill",
    Payload: JSON.stringify({ beingType })
    // InvocationType: 'RequestReponse'
  })
  return result
}

exports.$supply = ({ beingType }, callback) => {
  const result = invokeLambda({
    FunctionName: "supply",
    Payload: JSON.stringify({ beingType })
  })
  return result
}
