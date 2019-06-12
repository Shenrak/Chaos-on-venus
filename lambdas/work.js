const {
  RESSOURCES,
  refillRation,
  refillElectricity,
  getHumans,
  getRobots
} = require("./ressources")

module.exports.humansWork = () => {
  for (let i = 0; i < getHumans(); i++) {
    work(RESSOURCES.HUMAN)
  }
}

module.exports.robotsWork = () => {
  for (let i = 0; i < getRobots(); i++) {
    work(RESSOURCES.ROBOT)
  }
}

const work = actor => {
  switch (actor) {
    case RESSOURCES.HUMAN:
      refillRation(1)
      break
    case RESSOURCES.ROBOT:
      refillElectricity(1)
      break
  }
}
