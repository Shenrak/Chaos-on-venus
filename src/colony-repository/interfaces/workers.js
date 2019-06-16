const { query } = require("./interfaces-tools")
const { workers } = require("../state").state

module.exports.getWorkers = props => query(workers)(props) 
