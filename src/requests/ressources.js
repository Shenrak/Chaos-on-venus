var aws = require("aws-sdk")
var lambda = new aws.Lambda({
  region: "eu-west-3" //change to your region
})

exports.$consume = (ressource, quantity) => {
  lambda.invoke({
    FunctionName: 'consume',
    Payload: JSON.stringify({ressource, quantity}),
    InvocationType: 'Event'
  }, function(error, data) {
    console.log(error, data)
  });
}
