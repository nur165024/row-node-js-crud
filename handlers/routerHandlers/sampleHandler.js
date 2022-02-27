/**
 * title: sample handler
 * description: sample handler
 * name: nure alam
 * date: 25-2-2022
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: 'This is a sample url',
  });
};

module.exports = handler;
