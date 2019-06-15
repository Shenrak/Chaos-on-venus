
const handleLambdaEvent = handler => async (event, context, callBack) => {
  console.log(`Incoming request on ${context.functionName}`, event)

  const result = handler(event)

  if(result.then) {
    console.log("Awaiting for response...")
    await result.then((response) => {
      console.log("RESPONSE", response)
      callBack(null, { response })
    })
  }
  else {
      console.log("RESULT", result)
      callBack(null, { result })
  }
}

module.exports.handleLambdaEvent = handleLambdaEvent