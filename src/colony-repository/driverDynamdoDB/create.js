const { docClient } = require("./configAWSDynamoDB")

const save = async (tableName, input) => {
  let params = {
    TableName: tableName,
    Item: input
  }

  return await new Promise((resolve, reject) => {
    docClient.put(params, (err, data) => {
      if (err) {
        console.log(`An error has occurred : ${JSON.stringify(err, null, 2)}`)
        reject(err)
        throw new Error(err)
      } else {
        console.log(`Succes create` )
        resolve(data.Items)
      }
    })
  })
}
/*
let input = {
  email_id: "etienne2@gmail.com",
  created_by: "clientUser",
  created_on: new Date().toString(),
  updated_by: "clientUser",
  update_on: new Date().toString(),
  is_deleted: false
}*/

module.exports.create = save

//save("users", input)
