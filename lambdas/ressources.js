const { notEnoughRessources } = require("./exceptions")

const RESSOURCES = {
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

const consumeRation = quantity => {
  consume(RESSOURCES.RATION, quantity)
}

const refillRation = quantity => {
  refill(RESSOURCES.RATION, quantity)
}

const consumeElectricity = quantity => {
  consume(RESSOURCES.ELECTRICITY, quantity)
}

const refillElectricity = quantity => {
  refill(RESSOURCES.ELECTRICITY, quantity)
}

const killHuman = () => {
  consume(RESSOURCES.HUMAN, 1)
}

const killRobot = () => {
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

const getRessources = () => ressources

module.exports.RESSOURCES = RESSOURCES

module.exports.consumeRation = consumeRation
module.exports.refillRation = refillRation
module.exports.consumeElectricity = consumeElectricity
module.exports.refillElectricity = refillElectricity 
module.exports.killHuman = killHuman
module.exports.killRobot = killRobot

module.exports.getRessources = getRessources