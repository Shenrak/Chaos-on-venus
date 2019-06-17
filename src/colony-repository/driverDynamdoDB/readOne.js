const { docClient } = require("./configAWSDynamoDB")

const readOne = async (tableName, key) => {
  let params = {
    TableName: tableName,
    Key: key
  }
  return await new Promise((resolve, reject) => {
    docClient.get(params, (err, data) => {
      if (err) {
        console.log(`An error has occurred : ${JSON.stringify(err, null, 2)}`)
        reject(err)
        throw new Error(err)
      } else {
        console.log(`Succes readOne - Result : ${JSON.stringify(data, null, 2)}`)
        resolve(data.Items)
      }
    })
  })
}
module.exports.readOne = readOne

//readOne("users", "etienne@gmail.com")
