const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler' )
const { notFounderHandler } = require('./handlers/routeHandlers/notFounderHandler' )
const routes = {
    'sample': sampleHandler,
    'notFound': notFounderHandler,
}

module.exports= routes