/**
 * title : user handler
 * description : user handler
 * name : nure alam
 * date : 27-2-2022
 */

// dependence
const { hash, parseJSON } = require('../../helpers/utilities');
const data = require('../../lib/data');

// scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptMethods = ['get', 'post', 'put', 'delete'];

  if (acceptMethods.indexOf(requestProperties.method) > -1) {
    handler.users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
// users scaffolding
handler.users = {};

// get request
handler.users.get = (requestProperties, callback) => {
  // check it query string in valid
  const phone =
    typeof requestProperties.queryStringObject.phone === 'string' &&
    requestProperties.queryStringObject.phone.trim().length > 0
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    data.read('users', phone, (err, u) => {
      const user = { ...parseJSON(u) };

      if (!err && user) {
        delete user.password;

        callback(200, user);
      } else {
        callback(404, {
          error: 'Request was not found',
        });
      }
    });
  } else {
    callback(404, {
      error: 'Request was not found',
    });
  }
};

// post request
handler.users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === 'string' &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === 'string' &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim().length > 0
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === 'boolean'
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that the user doesn't already exists
    data.read('users', phone, (err) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        data.create('users', phone, userObject, (err1) => {
          if (!err1) {
            callback(200, {
              message: 'User was Created successfully!',
            });
          } else {
            callback(500, {
              error: 'Could not create user!',
            });
          }
        });
      } else {
        callback(500, {
          error: 'There was a problem in server side!',
        });
      }
    });
  } else {
    callback(400, {
      error: 'You have a problem in your request!',
    });
  }
};

// put request and update data
handler.users.put = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === 'string' &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === 'string' &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim().length > 0
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === 'boolean'
      ? requestProperties.body.tosAgreement
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // loop up the user
      data.read('users', phone, (err, uData) => {
        const userData = { ...parseJSON(uData) };

        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }

          if (lastName) {
            userData.lastName = lastName;
          }

          if (password) {
            userData.password = hash(password);
          }

          data.update('users', phone, userData, (err1) => {
            if (!err1) {
              callback(200, {
                message: 'User was updated successfully!',
              });
            } else {
              callback(500, {
                error: 'There was a problem in the server side!',
              });
            }
          });
        } else {
          callback(400, {
            error: 'You have problem your request!',
          });
        }
      });
    } else {
      callback(400, {
        error: 'You have problem your request!',
      });
    }
  } else {
    callback(400, {
      error: 'Invalid phone number,please try again!',
    });
  }
};

handler.users.delete = (requestProperties, callback) => {
  // check it query string in valid
  const phone =
    typeof requestProperties.queryStringObject.phone === 'string' &&
    requestProperties.queryStringObject.phone.trim().length > 0
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    data.read('users', phone, (err, userData) => {
      if (!err && userData) {
        data.delete('users', phone, (err1) => {
          if (!err1) {
            callback(200, {
              message: 'User was successfully deleted!',
            });
          } else {
            callback(500, {
              error: 'There was a server side error!',
            });
          }
        });
      } else {
        callback(400, {
          error: 'There was a server side error!',
        });
      }
    });
  } else {
    callback(400, {
      error: 'There was a problem in your request!',
    });
  }
};

module.exports = handler;
