import {
  RESSOURCES,
  refillRation,
  refillElectricity,
  getHumans,
  getRobots
} from "./ressources"

export const humansWork = () => {
  for (let i = 0; i < getHumans(); i++) {
    work(RESSOURCES.HUMAN)
  }
}

export const robotsWork = () => {
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
