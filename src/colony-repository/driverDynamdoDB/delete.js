const { docClient } = require("./configAWSDynamoDB")

const remove = async (tableName, key) => {
  let params = {
    TableName: tableName,
    Key: key
  }
  return await new Promise((resolve, reject) => {
    docClient.delete(params, (err, data) => {
      if (err) {
        console.log(`An error has occurred : ${JSON.stringify(err, null, 2)}`)
        reject(err)
        throw new Error(err)
      } else {
        console.log(`Succes remove`)
        resolve(data.Items)
      }
    })
  })
}

module.exports.remove = remove

//remove("users", "etienne@gmail.com")
