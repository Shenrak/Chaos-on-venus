const {
  RESSOURCES,
  consumeRation,
  consumeElectricity,
  getHumans,
  getRobots
} = require("../lambdas/ressources")
const { handleLambdaEvent } = require("./lambda-tools")

const { $consume } = require("../requests/ressources")

module.exports.humansSupply = () => {
  for (let i = 0; i < getHumans(); i++) {
    supply(RESSOURCES.HUMAN)
  }
}

module.exports.robotsSupply = () => {
  for (let i = 0; i < getRobots(); i++) {
    supply(RESSOURCES.ROBOT)
  }
}

const supply = ({ beingType, quantity = 1 }) => {
  let response = "empty"
  switch (beingType) {
    case RESSOURCES.HUMAN:
      response = $consume({ ressource: RESSOURCES.RATION, quantity })
      break
    case RESSOURCES.ROBOT:
      response = $consume({ ressource: RESSOURCES.ELECTRICITY, quantity }).Payload
      break
  }
  return response
}

module.exports.supply = handleLambdaEvent(supply)
