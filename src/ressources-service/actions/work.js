const { RESSOURCES } = require("../../utils/enums")
const { $refill } = require("../../utils/requests/ressources")
// const {
//   refillRation,
//   refillElectricity,
//   getHumans,
//   getRobots
// } = require("./ressources")

// module.exports.humansWork = () => {
//   for (let i = 0; i < getHumans(); i++) {
//     work(RESSOURCES.HUMAN)
//   }
// }

// module.exports.robotsWork = () => {
//   for (let i = 0; i < getRobots(); i++) {
//     work(RESSOURCES.ROBOT)
//   }
// }

// const work = actor => {
//   switch (actor) {
//     case RESSOURCES.HUMAN:
//       refillRation(1)
//       break
//     case RESSOURCES.ROBOT:
//       refillElectricity(1)
//       break
//   }
// }

const work = ({ beingType, productivity = 1 }) => {
  let response = "empty"
  switch (beingType) {
    case RESSOURCES.HUMAN:
      response = $refill({ ressource: RESSOURCES.RATION, quantity: 1 * productivity })
      break
    case RESSOURCES.ROBOT:
      response = $refill({ ressource: RESSOURCES.ELECTRICITY, quantity: 1 * productivity })
      break
  }

  return response
}

module.exports.work = work