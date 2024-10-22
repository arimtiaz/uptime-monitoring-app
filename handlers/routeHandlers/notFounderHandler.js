const handler = {};

handler.notFounderHandler = (requestProperties, callback) =>{
    callback(404, {
        message: 'Not Found',
    })
    
}

module.exports = handler;