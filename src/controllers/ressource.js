const {
  getRessources,
  consume,
  refill,
  killHuman,
  KillRobot
} = require("../lambdas/ressources")

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

exports.getRessources = (event, context, callback) => {
  callback(null, tryExec(getRessources))
}

exports.consume = (event, context, callback) => {
    console.log(event)
  const parameters = {
    ressource: event.pathParameters.ressourceType,
    quantity: JSON.parse(event.body).quantity
  }
  callback(null, tryExec(consume, parameters))
}

exports.refill = (event, context, callback) => {
  const parameters = {
    ressource: event.pathParameters.ressourceType,
    quantity: JSON.parse(event.body).quantity
  }
  callback(null, tryExec(refill, parameters))
}

exports.kill = (event, context, callback) => {
  const parameters = {
    ressource: event.pathParameters.ressourceType
  }
  callback(null, tryExec(kill, parameters))
}
