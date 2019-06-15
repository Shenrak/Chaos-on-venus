var aws = require("aws-sdk")
var lambda = new aws.Lambda({
  region: "eu-west-3" //change to your region
})

exports.$consume = async ({ ressource, quantity }) => {
  await lambda.invoke(
    {
      FunctionName: "consume",
      Payload: JSON.stringify({ ressource, quantity })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("consume " + JSON.stringify(ressource))
      console.log(error ? error : "", data.Payload.Response)
    }
  )
}

exports.$refill = async ({ ressource, quantity }) => {
  await lambda.invoke(
    {
      FunctionName: "refill",
      Payload: JSON.stringify({ ressource, quantity })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("refill " + ressource)
      console.log(error ? error : "", data.Payload.Response)
    }
  )
}

exports.$kill = async ({ beingType }) => {
  await lambda.invoke(
    {
      FunctionName: "kill",
      Payload: JSON.stringify({ beingType })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("kill " + beingType)
      console.log(error ? error : "", data.Payload)
    }
  )
}

exports.$supply = async ({ beingType }) => {
  await lambda.invoke(
    {
      FunctionName: "supply",
      Payload: JSON.stringify({ beingType })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("supply " + beingType)
      console.log(error ? error : "", data.Payload)
    }
  )
}
