const {
  RESSOURCES,
  consumeRation,
  consumeElectricity,
  getHumans,
  getRobots
} = require("./ressources")

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

const supply = actor => {
  switch (actor) {
    case RESSOURCES.HUMAN:
      consumeRation(1)
      break
    case RESSOURCES.ROBOT:
      consumeElectricity(1)
      break
  }
}
