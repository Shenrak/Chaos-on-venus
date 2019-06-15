const invokeLambda = ({FunctionName, Payload, ...props}) => {
  return new Promise(function(resolve, reject) {
    lambda.invoke(
      {
        FunctionName,
        Payload: JSON.stringify(Payload),
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

  const response = JSON.parse(data.Payload || "{}")
  if(response.errorMessage) {
    console.log("RESPONSE ERROR",response)
    reject(response.errorMessage)
  }

  resolve(response.result);
}

module.exports.invokeLambda = invokeLambda
module.exports.lambdaInvokeResponseHandler = lambdaInvokeResponseHandler