const main = () => {
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
  let timeMS = time * 1000
  setTimeout(() => {
    action()
  }, timeMS)
}

const consumptionElectricityRobot = () => {
  /** TODO CALL LAMBDA **/
}

const consumptionElectricityHuman = () => {
  /** TODO CALL LAMBDA **/
}

const consumptionElectricityBase = () => {
  /** TODO CALL LAMBDA **/
}

const consumptionRationHuman = () => {
  /** TODO CALL LAMBDA **/
}
