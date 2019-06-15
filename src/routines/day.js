const { $consume, $supply } = require("../requests/ressources")

exports.day = () => {
  doActionAtTime(1, () => {
    consumptionElectricityRobot()
  })
  doActionAtTime(9, () => {
    consumptionElectricityHuman()
    consumptionElectricityRobot()
  })
  doActionAtTime(10, () => {
    consumptionRationHuman()
  })
  doActionAtTime(12, () => {
    consumptionElectricityBase()
  })
  doActionAtTime(17, () => {
    consumptionElectricityRobot()
  })
  doActionAtTime(19, () => {
    consumptionRationHuman()
  })
}

const doActionAtTime = (time, action) => {
  let timeMS = time * 10
  setTimeout(() => {
    action()
  }, timeMS)
}

const consumptionElectricityRobot = () => {
  $supply({ beingType: "robot" })
}

const consumptionElectricityHuman = () => {
  $consume({ ressource: "electricity", quantity: 1 })
}

const consumptionElectricityBase = () => {
  $consume({ ressource: "electricity", quantity: 10 })
}

const consumptionRationHuman = () => {
  $supply({ beingType: "human" })
}
