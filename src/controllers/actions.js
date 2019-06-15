const {
  supply
} = require("../lambdas/supply")

const tryExec = (func, parameters) => {
  try {
    return {
      statusCode: "200",
      body: JSON.stringify(func(parameters))
    }
  } catch (ex) {
      console.log(ex)
    return {
      statusCode: "500",
      body: JSON.stringify(ex)
    }
  }
}

exports.supply = (event, context, callback) => {
    console.log("Supply")
  const parameters = {
    beingType: event.pathParameters.beingType,
  }
  callback(null, tryExec(supply, parameters))
}