import { notEnoughRessources } from "./exceptions"

export const RESSOURCES = {
  RATION: "RATION",
  ELECTRICITY: "ELECTRICITY",
  ROBOT: "ROBOT",
  HUMAN: "HUMAN"
}

let ressources = {
  [RESSOURCES.RATION]: 100, // TO DEF BY CONF FILE
  [RESSOURCES.ELECTRICITY]: 100, // TO DEF BY CONF FILE
  [RESSOURCES.ROBOT]: 20, // TO DEF BY CONF FILE
  [RESSOURCES.HUMAN]: 5 // TO DEF BY CONF FILE
}

export const consumeRation = quantity => {
  consume(RESSOURCES.RATION, quantity)
}

export const refillRation = quantity => {
  refill(RESSOURCES.RATION, quantity)
}

export const consumeElectricity = quantity => {
  consume(RESSOURCES.ELECTRICITY, quantity)
}

export const refillElectricity = quantity => {
  refill(RESSOURCES.ELECTRICITY, quantity)
}

export const killHuman = () => {
  consume(RESSOURCES.HUMAN, 1)
}

export const killRobot = () => {
  consume(RESSOURCES.ROBOT, 1)
}

const consume = (ressource, quantity) => {
  if (ressources[ressource] - quantity < 0) {
    notEnoughRessources(ressource)
  } else {
    ressources[ressource] -= quantity
    console.log(
      `${ressource} consommées : ${quantity}. ${ressource} restantes : ${
        ressources[ressource]
      }`
    )
    return ressources[ressource]
  }
}

function refill(ressource, quantity) {
  ressources[ressource] += quantity
}

// ACCESSORS

function getRations() {
  return ressources.rations
}

function getElectricity() {
  return ressources.electricity
}

function getRobots() {
  return ressources.robots
}

function getHumans() {
  return ressources.humans
}
