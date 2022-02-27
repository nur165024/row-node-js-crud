/**
 * title: no found handler
 * description: no found handler
 * name: Nure Alam
 * date: 26-2-2022
 */

// handler scaffolding
const handler = {};

handler.noFoundHandler = (requestProperties, callback) => {
  console.log('no found handler');
  callback(404, {
    message: 'Your request URL was not found',
  });
};

module.exports = handler;
