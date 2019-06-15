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

const supply = ({ beingType }, context, callback) => {
  switch (beingType) {
    case RESSOURCES.HUMAN:
      console.log("Un humain mange")
      return `${$consume(beingType, 1)} - Un humain mange`

    case RESSOURCES.ROBOT:
      console.log("Un robot se recharge")
      return `${$consume(beingType, 1)} - Un robot se recharge`
  }
}

module.exports.supply = handleLambdaEvent(supply)