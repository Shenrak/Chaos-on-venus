const aws = require("aws-sdk")
const lambda = new aws.Lambda({
  region: process.env.REGION 
})

const invokeLambda = ({FunctionName, Payload = {}, ...props}) => {
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
  if(data == null || data == undefined) {
    return reject(error)
  }

  const payload = JSON.parse(data.Payload || "{}")
  if(payload.errorMessage) {
    console.log("RESPONSE ERROR",payload)
    return reject(payload.errorMessage)
  }

  return resolve(payload.response);
}

module.exports.invokeLambda = invokeLambda