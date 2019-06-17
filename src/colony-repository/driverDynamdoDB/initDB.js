const { state } = require("../state")
const { create } = require("./create")
const { removeAll } = require("./deleteAll")

const initDB = async () => {
  const infrastructures = state.infrastructures
  const workers = state.workers
  const ressources = state.ressources

  await removeAll("Infrastructures")

  await removeAll("Workers")
  
  await removeAll("Ressources")

  infrastructures.forEach(async infrastructure => {
    await create("Infrastructures", infrastructure)
  })

  workers.forEach(async worker => {
    await create("Workers", worker)
  })

  Object.keys(ressources).forEach(async ressourceKey => {
    await create("Ressources", {
      type: ressourceKey,
      quantity: ressources[ressourceKey]
    })
  })

  return { succes: true }
}

module.exports.initDB = initDB
