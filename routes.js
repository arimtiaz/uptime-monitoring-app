const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler' )
const { notFounderHandler } = require('./handlers/routeHandlers/notFounderHandler' )
const { userHandler } = require('./handlers/routeHandlers/userHandler' )
const routes = {
    'sample': sampleHandler,
    'notFound': notFounderHandler,
    'user': userHandler,
}

module.exports= routes