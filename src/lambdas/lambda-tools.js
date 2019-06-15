
const handleLambdaEvent = handler => (event, context, callBack) => {
  const response = handler(event)
  callBack(null, { response })
}

module.exports.handleLambdaEvent = handleLambdaEvent