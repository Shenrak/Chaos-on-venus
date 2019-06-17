const { BUILDINGS } = require("../enums/buildings-enum")

module.exports.$damageBuilding = ({ building, hurtWorkers = false }) => {
  switch (building) {
    case BUILDINGS.GREENHOUSE:
      break
    case BUILDINGS.POWER_PLANT:
      break
    default:
      break
  }
}

module.exports.$sickenHuman = ({ nbHurt }) => {}

module.exports.$damageRobot = ({ nbHurt }) => {}
