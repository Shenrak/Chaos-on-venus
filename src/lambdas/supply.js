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

module.exports.supply = ({ beingType }) => {
  Console.log("Un humain mange")
  switch (beingType) {
    case RESSOURCES.HUMAN:
      Console.log("Un humain mange")
      $consume(beingType, 1)
      break
    case RESSOURCES.ROBOT:
      Console.log("Un robot se recharge")
      $consume(beingType, 1)
      break
  }
}
