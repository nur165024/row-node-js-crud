/**
 * title: Handle request and response
 * description: handle all request and response
 * name: Nure Alam
 * date: 24-2-2022
 */
// dependence
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routers');
const { noFoundHandler } = require('../handlers/routerHandlers/noFoundHandler');
const { parseJSON } = require('./utilities');

// object scaffolding
const handler = {};

// handle response and request
handler.handleReqRes = (req, res) => {
  // request handling
  // get url and parse it
  const parseUrl = url.parse(req.url, true);
  // url path
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // url query parameter
  const queryStringObject = parseUrl.query;
  // method
  const method = req.method.toLowerCase();
  // header
  const headerObject = req.headers;

  // all request properties
  const requestProperties = {
    parseUrl,
    path,
    trimmedPath,
    queryStringObject,
    method,
    headerObject,
  };

  // decode text
  const decoder = new StringDecoder('utf-8');
  let realData = '';

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : noFoundHandler;

  // body
  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on('end', () => {
    realData += decoder.end();

    requestProperties.body = parseJSON(realData);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      const payLoadString = JSON.stringify(payload);

      res.setHeader('Content-type', 'application/json');
      res.writeHead(statusCode);
      res.end(payLoadString);
    });
  });
};

module.exports = handler;
