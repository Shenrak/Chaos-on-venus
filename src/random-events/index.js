const { BUILDINGS } = require("../utils/enums/buildings-enum")
const {
  $damageBuilding,
  $sickenHuman,
  $damageRobot
} = require("../utils/requests")

module.exports.mayMeteorFall = (probability = 0.001, building = "") => {
  if (Math.random() < probability) {
    if (Math.random() < 0.5 || building === BUILDINGS.POWER_PLANT) {
      $damageBuilding({ building: BUILDINGS.POWER_PLANT, hurtWorkers: true })
    } else {
      $damageBuilding({ building: BUILDINGS.GREENHOUSE, hurtWorkers: true })
    }
  }
}

module.exports.mayPlague = (probability = 0.05) => {
  if (Math.random() < probability) {
    return $sickenHuman({ nbHurt: Math.trunc((Math.random() * 10) / 2) })
  }
}

module.exports.mayDamageRobot = (probability = 0.01) => {
  if (Math.random() > probability) {
    $damageRobot({ nbHurt: 1 })
  }
}
