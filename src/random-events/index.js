const { BUILDINGS } = require("../utils/enums/buildings-enum")
const {
  $damageBuilding,
  $sickenHuman,
  $damageRobot
} = require("../utils/requests")

module.exports.mayMeteorFall = (bool = false, building = "") => {
  if (Math.random() < 0.001 || bool) {
    if (Math.random() < 0.5 || building === BUILDINGS.POWER_PLANT) {
      $damageBuilding({ building: BUILDINGS.POWER_PLANT, hurtWorkers: true })
    } else {
      $damageBuilding({ building: BUILDINGS.GREENHOUSE, hurtWorkers: true })
    }
  }
}

module.exports.mayPlague = (bool = false) => {
  if (Math.random() < 0.05 || bool) {
    $sickenHuman({ nbHurt: Math.trunc((Math.random() * 10) / 2) })
  }
}

module.exports.mayDamageRobot = (bool = false) => {
  if (Math.random() > 0.01 || bool) {
    $damageRobot({ nbHurt: 1 })
  }
}
