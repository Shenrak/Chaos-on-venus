import {
  RESSOURCES,
  consumeRation,
  consumeElectricity,
  getHumans,
  getRobots
} from "./ressources"

export const humansSupply = () => {
  for (let i = 0; i < getHumans(); i++) {
    supply(RESSOURCES.HUMAN)
  }
}

export const robotsSupply = () => {
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
