const { docClient } = require("./configAWSDynamoDB")

const modify = async (
  tableName,
  key,
  updateExpression,
  expressionAttributeValues
) => {
  let params = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "UPDATED_NEW"
  }
  return await new Promise((resolve, reject) => {
    docClient.update(params, (err, data) => {
      if (err) {
        console.log(`An error has occurred : ${JSON.stringify(err, null, 2)}`)
        reject(err)
        throw new Error(err)
      } else {
        console.log(`Succes update`)
        resolve(data)
      }
    })
  })
}

module.exports.update = modify
/*
modify(
  "users",
  "etienne@gmail.com",
  "set updated_by = :byUser, is_deleted = :boolValue",
  { ":byUser": "updateUser", ":boolValue": true }
)*/
