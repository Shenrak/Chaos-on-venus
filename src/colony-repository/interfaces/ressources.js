const { notEnoughRessources, unknownRessource } = require("./exceptions")
const { ressources } = require("../state").state

const consume = ({ quantity, ressource }) => {
  console.log(`Consuming ${quantity} ${ressource}`)
  if (ressources[ressource] - quantity < 0) {
    notEnoughRessources(ressource)
  } else if (!ressources[ressource]) {
    console.log("ressources", ressources)
    unknownRessource(ressource)
  } else {
    ressources[ressource] -= quantity
    console.log(
      `${ressource} consommées : ${quantity}. ${ressource} restantes : ${
        ressources[ressource]
      }`
    )
    return {[ressource]: ressources[ressource]}
  }
}

function refill({ ressource, quantity }) {
  if (!ressources[ressource]) {
    unknownRessource(ressource)
  } else {
    ressources[ressource] += quantity
  }
  console.log(
    `${ressource} créées : ${quantity}. Stock de ${ressource} : ${
      ressources[ressource]
    }`
  )

  return {[ressource]: ressources[ressource]}
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
