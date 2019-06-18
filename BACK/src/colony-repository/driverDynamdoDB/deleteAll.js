//const { docClient } = require("./configAWSDynamoDB")
const { readAll } = require("./readAll")
const { remove } = require("./delete")

const removeAll = async tableName => {
  const result = await readAll(tableName)
  const items = result
  await Promise.all(
    items.map(item => {
      if (item.id === undefined) {
        return remove(tableName, { type: item.type })
      } else {
        return remove(tableName, { id: item.id })
      }
    })
  )
}

module.exports.removeAll = removeAll
