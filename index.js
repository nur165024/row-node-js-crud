/**
 * title: Uptime Monitoring Application
 * description: A restful API to monitor app
 * name: Nure Alam
 * date: 22-02-2022
 */

// dependence
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');

// object scaffolding
const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleResReq);

  server.listen(environment.port, () => {
    console.log(`listening to part ${environment.port}`);
  });
};

// handle response and request
app.handleResReq = handleReqRes;

app.createServer();
