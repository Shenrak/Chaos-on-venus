var aws = require("aws-sdk")
var lambda = new aws.Lambda({
  region: "eu-west-3" //change to your region
})

exports.$consume = ({ ressource, quantity }, callback) => {
  var result = new Promise(function(resolve, reject) {
    lambda.invoke(
      {
        FunctionName: "consume",
        Payload: JSON.stringify({ ressource, quantity })
        // InvocationType: 'RequestReponse'
      },
      function(error, data) {
        // console.log("consume " + JSON.stringify(ressource))
        const response = data ? JSON.parse(data.Payload).result : "{}"
        console.log(error ? error : "", response)
        resolve(response);
      }
    )
  });

  return result
}

exports.$refill = ({ ressource, quantity }, callback) => {
  lambda.invoke(
    {
      FunctionName: "refill",
      Payload: JSON.stringify({ ressource, quantity })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("refill " + ressource)
      const response = data ? JSON.parse(data.Payload).response : "{}"
      console.log(error ? error : "", response)
      callback(error ? error : "", response)
    }
  )
}

exports.$kill = ({ beingType }, callback) => {
  lambda.invoke(
    {
      FunctionName: "kill",
      Payload: JSON.stringify({ beingType })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("kill " + beingType)
      const response = data ? JSON.parse(data.Payload).response : "{}"
      console.log(error ? error : "", response)
      callback(error ? error : "", response)
    }
  )
}

exports.$supply = ({ beingType }, callback) => {
  lambda.invoke(
    {
      FunctionName: "supply",
      Payload: JSON.stringify({ beingType })
      // InvocationType: 'RequestReponse'
    },
    function(error, data) {
      // console.log("supply " + beingType)
      const response = data ? JSON.parse(data.Payload).response : "{}"
      console.log(error ? error : "", response)
      callback(error ? error : "", response)
    }
  )
}
