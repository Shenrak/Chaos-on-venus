const aws = require("aws-sdk")
const lambda = new aws.Lambda({
  region: "eu-west-3" //change to your region
})

const invokeLambda = ({FunctionName, Payload, ...props}) => {
  return new Promise(function(resolve, reject) {
    lambda.invoke(
      {
        FunctionName,
        Payload: typeof Payload === "string" ? Payload : JSON.stringify(Payload),
        ...props,
        // InvocationType: 'RequestReponse'
      },
      lambdaInvokeResponseHandler(resolve, reject)
    )
  });
}

const lambdaInvokeResponseHandler = (resolve, reject) => (error, data) => {
  if(!data) {
    reject(error)
  }

  const payload = JSON.parse(data.Payload || "{}")
  if(payload.errorMessage) {
    console.log("RESPONSE ERROR",payload)
    reject(payload.errorMessage)
  }

  resolve(payload.response);
}

module.exports.invokeLambda = invokeLambda
module.exports.lambdaInvokeResponseHandler = lambdaInvokeResponseHandler