const handleLambdaEvent = handler => async (event, context, callBack) => {
  console.log(`Incoming lambda event on ${context.functionName}`, event);


  try {
    const result = handler(event) || {}

    if (result.then) {
      console.log("Awaiting for response...")
      await result.then(
        response => {
          console.log("PROMISE RESPONSE", response)
          callBack(null, { response })
        },
        err => {
          console.log("PROMISE ERROR", err)
          callBack(err)
        }
      )
    } else {
      console.log("RESPONSE", result)
      callBack(null, { response: result })
    }
  } catch (err) {
    console.log("ERROR", err)
    callBack(err.message)
  }
}

module.exports.handleLambdaEvent = handleLambdaEvent
