const { notEnoughRessources, unknownRessource } = require("./exceptions")
const { ressources } = require("../state").state
const { update } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")
const { queryArray } = require("./interfaces-tools")

module.exports.getRessources = async ({ query } = {}) => {
  const ressources = await readAll("Ressources")
  return queryArray(ressources)(query)
}

module.exports.updateRessource = async ({ type, changes }) => {
  let queryUpdate = "set "
  let variableQuery = {}
  queryUpdate += Object.keys(changes)
    .map(key => {
      variableQuery[`:${key}`] = changes[key]
      return `${key} = :${key}`
    })
    .join(",")

  await update("Ressources", { type: type }, queryUpdate, variableQuery)
}

const consume = async ({ quantity, ressource }) => {
  console.log("QUANTITY", quantity)
  console.log("NOM DE LA RESSOURCE", ressource)
  const r = await this.getRessources()
  console.log("RESSOURCESSSSSZZZZ", r)
  console.log(`Consuming ${quantity} ${ressource}`)
  if (ressources[ressource] - quantity < 0) {
    notEnoughRessources(ressource)
  } else if (!ressources[ressource]) {
    unknownRessource(ressource)
  } else {
    ressources[ressource] -= quantity

    await this.updateRessource({
      type: ressource,
      changes: { quantity: ressources[ressource] }
    })
    console.log(
      `${ressource} consommées : ${quantity}. ${ressource} restantes : ${
        ressources[ressource]
      }`
    )
    return { [ressource]: ressources[ressource] }
  }
}

const refill = async ({ ressource, quantity }) => {
  const ressources = await this.getRessources({ query: { type: "ration" } })
  let ressourceBDD = ressources[0]
  console.log("ressources", ressources)

  console.log("RESSOURCESBDD", ressourceBDD)
  if (!ressourceBDD) {
    unknownRessource(ressource)
  } else {
    ressourceBDD.quantity += quantity

    await this.updateRessource({
      type: ressource,
      changes: { quantity: ressourceBDD.quantity }
    })
  }
  console.log(
    `${ressource} créées : ${quantity}. Stock de ${ressource} : ${
      ressources[ressource]
    }`
  )

  return { [ressource]: ressources[ressource] }
}

// ACCESSORS

// function getRations() {
//   return ressources.rations
// }

// function getElectricity() {
//   return ressources.electricity
// }

// function getRobots() {
//   return ressources.robots
// }

// function getHumans() {
//   return ressources.humans
// }


module.exports.consume = consume
module.exports.refill = refill