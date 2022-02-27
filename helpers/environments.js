/**
 * title: environment data
 * description: environment data
 * name: nure alam
 * date: 26-2-2022
 */

// module scaffolding
const environments = {};

// staging area
environments.staging = {
  port: 5000,
  envName: 'staging',
};

// production area
environments.production = {
  port: 4000,
  envName: 'production',
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === 'object'
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
