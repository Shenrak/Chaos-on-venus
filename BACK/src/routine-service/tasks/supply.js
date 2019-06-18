
const getRationsMultiplicator = (worker) => {
  let multiplicator = 1
  if(worker.sick) {
    multiplicator = 2
  }
  return multiplicator
}

const getSupplyMultiplicator = (ressource, worker) => {
  switch (ressource) {
    case "ration":
      return getRationsMultiplicator(worker)

    default:
      return 1
  }
}

module.exports.supply = (worker, ressourcesToConsume) => {
  worker.neededSupplies.map(({ ressource, quantity }) => {
    const multiplicator = getSupplyMultiplicator(ressource, worker)
    const consumed = quantity * multiplicator

    if (!ressourcesToConsume.find(r => r.ressource === ressource)) {
      ressourcesToConsume.push({ ressource, quantity: consumed })
    } else {
      ressourcesToConsume.find(
        r => r.ressource === ressource
      ).quantity += consumed
    }
  })
}