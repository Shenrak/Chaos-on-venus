export const notEnoughRessources = ressource => {
  throw {
    name: "notEnoughRessource",
    message: `Il n'y as plus assez de ${ressource} pour assurer la cohésion du système`
  }
}
