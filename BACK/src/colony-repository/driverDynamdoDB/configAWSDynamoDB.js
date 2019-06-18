const awsConfig = {
  region: "eu-west-3",
  endpoint: "https://dynamodb.eu-west-3.amazonaws.com",
  accessKeyId: "AKIAUWGABXJNVEB255DQ",
  secretAccessKey: "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"
}

const AWS = require("aws-sdk")

AWS.config.update(awsConfig)

module.exports.docClient = new AWS.DynamoDB.DocumentClient()
