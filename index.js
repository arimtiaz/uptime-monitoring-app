// dependency
const http = require('http');
const {handleRegRes} = require('./helpers/handleReqRes')
// module scafolding
const app = {};

// configuration
app.config = {
    port: 3001,
};

// creating the server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () =>{
        console.log(`listening to port ${app.config.port}`)
    })
}

// handle request
app.handleReqRes = handleRegRes;

app.createServer()