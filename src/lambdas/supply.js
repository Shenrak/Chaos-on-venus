const {
  RESSOURCES,
  consumeRation,
  consumeElectricity,
  getHumans,
  getRobots
} = require("../lambdas/ressources")
const { handleLambdaEvent } = require("./lambda-tools")

const { $consume } = require("../requests/ressources")

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

const supply = async ({ beingType, quantity = 1 }) => {
  let response = "empty"
  switch (beingType) {
    case RESSOURCES.HUMAN:
      await $consume(
        { beingType, quantity },
        str => (response = "Un humain mange \n" + str)
      )
      break
    case RESSOURCES.ROBOT:
      await $consume(
        { beingType, quantity },
        str => (response = "Un robot se recharge \n" + str)
      )
      break
  }
  console.log(response)
  return response
}

module.exports.supply = handleLambdaEvent(supply)
