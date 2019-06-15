const handleApiEvent = handler => async (event, context, callBack) => {
  console.log(`Incoming request on ${context.functionName}`, event);

  try {
    const result = handler(event) || {}

    if (result.then) {
      console.log("Awaiting for response...")
      await result.then(
        response => {
          console.log("PROMISE RESPONSE", response)
          callBack(null, {
            statusCode: "200",
            body: JSON.stringify(response)
          })
        },
        err => {
          console.log("PROMISE ERROR", err)
          callBack(err)
        }
      )
    } else {
      console.log("RESPONSE", result)
      callBack(null, {
        statusCode: "200",
        body: JSON.stringify(result)
      })
    }
  } catch (err) {
    console.log("ERROR", err)
    callBack(err.message)
  }
}

module.exports.handleApiEvent = handleApiEvent
