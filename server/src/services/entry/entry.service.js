// Initializes the `entry` service on path `/entry`
const createService = require('feathers-mongodb');
const hooks = require('./entry.hooks');

module.exports = function (app) {
  const mongoClient = app.get('mongoClient');
  const options = { };

  // Initialize our service with any options it requires
  app.use('/entry', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('entry');

  mongoClient.then(db => {
    service.Model = db.collection('entry');
  });

  service.hooks(hooks);
};
