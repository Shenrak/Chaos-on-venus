const { $getRessources } = require("../utils/requests/ressources")

module.exports.checkRessources = async () => {
  const result = $getRessources()
  return result.then(res => {
    console.log("RES", res)
    return res
  })
}

