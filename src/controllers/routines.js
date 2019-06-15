const {
  day
} = require("../routines/day")

const tryExec = (func, parameters) => {
  try {
    return {
      statusCode: "200",
      body: JSON.stringify(func(parameters))
    }
  } catch (ex) {
      console.log(ex)
    return {
      statusCode: "500",
      body: JSON.stringify(ex)
    }
  }
}

exports.day = (event, context, callback) => {
    console.log("La routine \"day\" a été lancée")
  callback(null, tryExec(day))
}