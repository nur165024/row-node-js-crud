/**
 * title: router handler
 * description: all router handler
 * name: nure alam
 * date: 25-2-2022
 */

// dependence
const { sampleHandler } = require('./handlers/routerHandlers/sampleHandler');
const { userHandler } = require('./handlers/routerHandlers/userHandler');

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
