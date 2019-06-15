const { handleApiEvent } = require("./api-event-handler")
const { $consume, $supply } = require("../requests/ressources")

const day = async () => {
  console.log("Starting daily routine")

  const routine = [
    doActionAtTime(1, [consumptionElectricityRobot]),
    doActionAtTime(9, [
      consumptionElectricityHuman,
      consumptionElectricityRobot
    ]),
    doActionAtTime(10, [consumptionRationHuman]),
    doActionAtTime(12, [consumptionElectricityBase]),
    doActionAtTime(17, [consumptionElectricityRobot]),
    doActionAtTime(19, [consumptionRationHuman])
  ]

  return Promise.all(routine)
  .then(values => {
    return values.reduce((accumulator, value) => {
      return [...accumulator, ...value]
    }, [])
  })
  .then(values => {
    return values
  })
}

const doActionAtTime = (time, actions) => {
  return new Promise((resolve, reject) => {
    let timeMS = time * 10
    setTimeout(() => {
      console.log("Starting actions")
      Promise.all(actions.map(action => action())).then(values => {
        console.log("ACTIONS", values)
        resolve(values)
      })
    }, timeMS)
  })
}

const consumptionElectricityRobot = () => {
  return $supply({ beingType: "robot" })
}

const consumptionElectricityHuman = () => {
  return $consume({ ressource: "electricity", quantity: 1 })
}

const consumptionElectricityBase = () => {
  return $consume({ ressource: "electricity", quantity: 10 })
}

const consumptionRationHuman = () => {
  return $supply({ beingType: "human" })
}

module.exports.day = handleApiEvent(day)