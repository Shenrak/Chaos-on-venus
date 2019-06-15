const {
  RESSOURCES,
  consumeRation,
  consumeElectricity,
  getHumans,
  getRobots
} = require("../lambdas/ressources")

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

module.exports.supply = ({ beingType }, context, callback) => {
  switch (beingType) {
    case RESSOURCES.HUMAN:
      console.log("Un humain mange")
      $consume(beingType, 1)
      callback(null, "Un humain mange")
      break
    case RESSOURCES.ROBOT:
      console.log("Un robot se recharge")
      $consume(beingType, 1)
      callback(null, "Un robot se recharge")
      break
  }
}
