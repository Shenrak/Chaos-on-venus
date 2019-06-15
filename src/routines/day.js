const { $consume, $supply } = require("../requests/ressources")

let logs = []

exports.day = async () => {
  console.log("Starting daily routine")

  const routine = [
    doActionAtTime(1, [
      consumptionElectricityRobot
    ]),
    doActionAtTime(9, [
      consumptionElectricityHuman,
      consumptionElectricityRobot
    ]),
    doActionAtTime(10, [
      consumptionRationHuman
    ]),
    doActionAtTime(12, [
      consumptionElectricityBase
    ]),
    doActionAtTime(17, [
      consumptionElectricityRobot
    ]),
    doActionAtTime(19, [
      consumptionRationHuman
    ])
  ]

  await Promise.all(routine).then(values => {console.log("values", values); logs.push(values); return values})
  console.log("End of the daily routine")
  return logs.join("\n")
}

const doActionAtTime = (time, actions) => {
  return new Promise(() => {
    let timeMS = time * 10
    setTimeout(() => {
      console.log("Starting actions")
      Promise.all(actions.map(action => action())).then(values => {console.log("ACTIONS", values); Promise.resolve(values)})
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
