/**
 * title: Utilities
 * description : important Utilities Functions
 * name: Nure Alam
 * date : 27-2-2022
 */

// dependence
const crypto = require('crypto');

// module scaffolding
const utilities = {};

// parse json string to object
utilities.parseJSON = (str) => {
  let output = {};

  try {
    output = JSON.parse(str);
  } catch (error) {
    output = {};
  }

  return output;
};

// hash string
utilities.hash = (str) => {
  const secret = 'abcdef';
  if (typeof str === 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', secret).update(str).digest('hex');
    return hash;
  }
  return false;
};

module.exports = utilities;
