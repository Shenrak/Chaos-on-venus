const { notEnoughRessources, unknownRessource } = require("./exceptions")
const { ressources } = require("../state").state
const { update } = require("../driverDynamdoDB/update")
const { readAll } = require("../driverDynamdoDB/readAll")
const { queryArray } = require("./interfaces-tools")

module.exports.getRessources = async query => {
  const ressoucres = await readAll("Ressources")
  return queryArray(ressoucres)(query)
}

module.exports.updateRessource = async ({ id, changes }) => {
  let queryUpdate = "set "
  let variableQuery = {}
  queryUpdate += Object.keys(changes)
    .map(key => {
      variableQuery[`:${key}`] = changes[key]
      return `${key} = :${key}`
    })
    .join(",")

  await update("Ressources", { id: id }, queryUpdate, variableQuery)
}

const consume = async ({ quantity, ressource }) => {
  console.log(`Consuming ${quantity} ${ressource}`)
  if (ressources[ressource] - quantity < 0) {
    notEnoughRessources(ressource)
  } else if (!ressources[ressource]) {
    console.log("ressources", ressources)
    unknownRessource(ressource)
  } else {
    await this.updateRessource({
      type: ressource,
      changes: { quantity: quantity }
    })
    ressources[ressource] -= quantity
    console.log(
      `${ressource} consommées : ${quantity}. ${ressource} restantes : ${
        ressources[ressource]
      }`
    )
    return { [ressource]: ressources[ressource] }
  }
}

const refill = async ({ ressource, quantity }) => {
  if (!ressources[ressource]) {
    unknownRessource(ressource)
  } else {
    await this.updateRessource({
      type: ressource,
      changes: { quantity: quantity }
    })
    ressources[ressource] += quantity
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

const getRessources = () => ressources

module.exports.consume = consume
module.exports.refill = refill

module.exports.getRessources = getRessources
