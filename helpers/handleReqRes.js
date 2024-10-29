// Dependencies
const routes = require("../routes");
const { StringDecoder } = require("string_decoder");
const url = require("url");
const {
  notFounderHandler,
} = require("../handlers/routeHandlers/notFounderHandler");

const {parseJSON}= require('/helpers/utilities')
// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // url parsing
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject,
  };

  const choosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFounderHandler;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body = parseJSON(realData);

    choosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });
    console.log(realData);
    res.end("Hello World");
  });
};
module.exports = handler;
