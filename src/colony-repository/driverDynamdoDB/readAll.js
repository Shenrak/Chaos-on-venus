const { docClient } = require("./configAWSDynamoDB")

const readAll = async tableName => {
  let params = {
    TableName: tableName
  }
  return await new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log(`An error has occurred : ${JSON.stringify(err, null, 2)}`)
        reject(err)
        throw new Error(err)
      } else {
        console.log(`Succes readAll - Result : ${JSON.stringify(data, null, 2)}`)
        resolve(data)
      }
    })
  })
}

module.exports.readAll = readAll

//readAll("Ressources")
