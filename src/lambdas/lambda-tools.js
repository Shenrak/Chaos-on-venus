
const handleLambdaEvent = handler => async (event, context, callBack) => {
  let response

  if(handler.then) {
    response = await handler(event)
  }
  else {
    response = handler(event)
  }
  
  callBack(null, { response })
}

module.exports.handleLambdaEvent = handleLambdaEvent