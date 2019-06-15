const { RESSOURCES } = require("../../utils/enums")
const { getHumans, getRobots } = require("../lambdas/ressources")
const { $consume } = require("../../utils/requests/ressources")

module.exports.humansSupply = () => {
  for (let i = 0; i < getHumans(); i++) {
    supply(RESSOURCES.HUMAN)
  }
}

module.exports.robotsSupply = () => {
  for (let i = 0; i < getRobots(); i++) {
    supply(RESSOURCES.ROBOT)
  }
}
const supply = ({ beingType, quantity = 1 }) => {
  let response = "empty"
  switch (beingType) {
    case RESSOURCES.HUMAN:
      response = $consume({ ressource: RESSOURCES.RATION, quantity })
      break
    case RESSOURCES.ROBOT:
      response = $consume({ ressource: RESSOURCES.ELECTRICITY, quantity })
      break
  }

  return response
}

module.exports.supply = supply
