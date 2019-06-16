const { query } = require("./interfaces-tools")
const { infrastructures } = require("../state").state

module.exports.getInfrastructures = props => query(infrastructures)(props) 
