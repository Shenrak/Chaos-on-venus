var aws = require("aws-sdk")
var lambda = new aws.Lambda({
  region: "eu-west-1" //change to your region
})

const $consume = (ressource, quantity) => {
  lambda.invoke(
    {
      FunctionName: "consume",
      Payload: JSON.stringify({ ressource, quantity }, null, 2) // pass params
    },
    function(error, data) {
      if (error) {
        context.done("error", error)
      }
      if (data.Payload) {
        context.succeed(data.Payload)
      }
    }
  )
}
