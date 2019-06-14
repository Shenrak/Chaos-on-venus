const { getRessources } = require("../lambdas/ressources")

exports.getRessources = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: JSON.stringify(getRessources()),
    });
};