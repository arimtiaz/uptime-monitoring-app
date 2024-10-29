// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes')
const environment = require('./helpers/environments')
const data = require('./lib/data')
// module scaffolding
const app = {};

// creating the server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () =>{
        console.log(`listening to port ${environment.port}`)
    })
}

// handle request
app.handleReqRes = handleReqRes;

app.createServer()