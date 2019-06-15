var aws = require("aws-sdk")
var lambda = new aws.Lambda({
  region: "eu-west-3" //change to your region
})

exports.$consume = async ({ ressource, quantity }, callback) => {
  const result = await lambda.invoke(
    {
      FunctionName: "consume",
      Payload: JSON.stringify({ ressource, quantity })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("consume " + JSON.stringify(ressource))
      console.log(error ? error : "", JSON.parse(data.Payload).response)
      callback(error ? error : "", JSON.parse(data.Payload).response)
    }
  ).promise()
  return result
}

exports.$refill = async ({ ressource, quantity }, callback) => {
  await lambda.invoke(
    {
      FunctionName: "refill",
      Payload: JSON.stringify({ ressource, quantity })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("refill " + ressource)
      console.log(error ? error : "", JSON.parse(data.Payload).response)
      callback(error ? error : "", JSON.parse(data.Payload).response)
    }
  ).promise()
}

exports.$kill = async ({ beingType }, callback) => {
  await lambda.invoke(
    {
      FunctionName: "kill",
      Payload: JSON.stringify({ beingType })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("kill " + beingType)
      console.log(error ? error : "", JSON.parse(data.Payload).response)
      callback(error ? error : "", JSON.parse(data.Payload).response)
    }
  ).promise()
}

exports.$supply = async ({ beingType }, callback) => {
  await lambda.invoke(
    {
      FunctionName: "supply",
      Payload: JSON.stringify({ beingType })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("supply " + beingType)
      const response = data.Payload ? JSON.parse(data.Payload).response : "{}"
      console.log(error ? error : "", response)
      callback(error ? error : "", response)
    }
  ).promise()
}
