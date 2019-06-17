const { queryArray } = require("./interfaces-tools")
const { workers } = require("../state").state

module.exports.getWorkers = ({query}) => queryArray(workers)({query})
