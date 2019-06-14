module.exports.notEnoughRessources = ressource => {
  throw {
    name: "notEnoughRessource",
    message: `Il n'y as plus assez de ${ressource} pour assurer la cohésion du système.`
  }
}

module.exports.unknownRessource = ressource => {
  throw {
    name: "unknownRessource",
    message: `La ressource que vous avez entré : ${ressource} est inconnue.`
  }
}