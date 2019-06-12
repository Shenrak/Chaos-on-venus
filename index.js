const { getRessources } = require("./lambdas/ressources")

exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: JSON.stringify(getRessources()),
    });
};